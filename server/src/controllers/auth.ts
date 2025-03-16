import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { generateToken, createHash, sendEmailNotification, calculateSessionTime } from "../utils";
import { SignupSchemaValidator } from "../validation/users";  
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { User } from "@prisma/client";
import { UnauthorizedException } from "../exceptions/unauthorized";
import _ from "lodash";

const origin = "http://localhost:5173";

import { UserWithoutSensitiveData } from "../utils/interfaces";

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    let user = await prismaClient.user.findFirst({
      where: { email },
    });
  
    if (!user) throw new NotFoundException("User does not exist", ErrorCode.NOT_FOUND);
  
    if (!compareSync(password, user.password))
      throw new BadRequestException(
        "Password is incorrect",
        ErrorCode.INCORRECT_PASSWORD,
        null
    );
  
    if (!user.isVerified) 
      throw new UnauthorizedException(
        "Please verify your email",
        ErrorCode.UNAUTHORIZED
    );
    
    const { token, refreshToken, options, refreshOptions } = generateToken(
      user.id
    );

    res.cookie("token", token, options);
    res.cookie("refreshToken", refreshToken, refreshOptions);

    res.status(200).json({ user });
};

export const signUp = async (req: Request, res: Response) => {
  SignupSchemaValidator.parse(req.body);
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user)
    throw new BadRequestException(
      "User already exist",
      ErrorCode.USER_ALREADY_EXISTS,
      null
    );

  const verificationToken = crypto.randomBytes(40).toString("hex");

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      verificationToken,
    },
  });

  /* not needed anymore - we don't want to give the user access to some protected routes if the account is not verified yet
    const { token, refreshToken, options, refreshOptions } = generateToken(
        user.id
    );
    res.cookie("token", token, options);
    res.cookie("refreshToken", refreshToken, refreshOptions);
  */
  
  await sendEmailNotification({
    name: user.name,
    emailTo: user.email,
    verificationToken,
    origin,
    type: "verification",
  });

  res
    .status(200)
    .json({ message: "Please check your email to verify account!" });
};

export const validateUserEmail = async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;

  let user = await prismaClient.user.findFirstOrThrow({
    where: { email },
  });

  if (user.verificationToken !== verificationToken)
    throw new UnauthorizedException(
      "Verification Failed",
      ErrorCode.UNAUTHORIZED
    );

  await prismaClient.user.update({
    where: { email },
    data: {
      isVerified: true,
      verified: new Date(),
      verificationToken: "",
    },
  });

  res.status(200).json({
    message: "Your account is now active, you can go back to your dashboard!",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  // we can use findFirstOrThrow - but we don't want to use this - if no user - it will throw an error
  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendEmailNotification({
      name: user.name,
      emailTo: user.email,
      verificationToken: passwordToken,
      origin,
      type: "resetPassword",
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await prismaClient.user.update({
      where: { email },
      data: {
        passwordToken: createHash(passwordToken),
        passwordTokenExpirationDate,
      },
    });
  }

  res.status(200).json({ message: "Please verify your email in order to reset your password!" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    throw new BadRequestException(
      "Please provide all values",
      ErrorCode.UNPROCESSABLE_ENTITY,
      null
    );
  }

  let user = await prismaClient.user.findFirstOrThrow({
    where: { email },
  });

  if (user) {
    const currentDate = new Date();

    if (user.passwordToken === createHash(token) && user.passwordTokenExpirationDate && user?.passwordTokenExpirationDate > currentDate) {
      await prismaClient.user.update({
        where: { email },
        data: {
          passwordToken: null,
          passwordTokenExpirationDate: null,
          password: hashSync(password, 10),
        },
      });

      res.status(200).json({ message: "Password reset, please log in back again" });
    } else {
      res.status(200).json({message: "Link Expired"});
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
    }
    
    const userWithoutSensitiveData: UserWithoutSensitiveData = _.omit(user, ["password", "passwordToken", "passwordTokenExpirationDate", "verificationToken"])

    res.status(200).json({ user: userWithoutSensitiveData }); // passed from MIDDLEWARE
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
    sameSite: 'none'
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
    sameSite: 'none'
  });

  res.status(200).send({ message: "Logout successful" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  const payload = jwt.verify(refreshToken, JWT_SECRET) as any;
  const user: User | null = await prismaClient.user.findFirst({
    where: {
      id: payload?.userId,
    },
  });

  if (!user) {
    throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  const { token, options } = generateToken(user.id);
  res.cookie("token", token, options);

  res.status(200).json({ token });
};

export const getSessionTime = (req: Request, res: Response) => {
    const token = req.cookies.token;
    const { remainingTime, isExpiringSoon } = calculateSessionTime(token);
    res.status(200).json({ remainingTime, isExpiringSoon });
};


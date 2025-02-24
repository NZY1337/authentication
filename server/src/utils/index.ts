import * as jwt from "jsonwebtoken";
import { JWT_SECRET, SMTP_PASSWORD } from "../secrets";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { BadRequestException } from "../exceptions/bad-request";
import {
  CookieOptions,
  TokenResponse,
  SendEmailInterface,
  SendVerificationEmailInterface,
} from "./interfaces";

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "mandreicosmin1990@gmail.com",
    pass: SMTP_PASSWORD,
  },
};

export const createHash = (string: string) =>
  crypto.createHash("md5").update(string).digest("hex");

const sendEmail = async ({ emailTo, subject, html }: SendEmailInterface) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Andreww 👻" <mandreicosmin1990@gmail.com>', // sender address || ADMIN's EMAIL
    to: emailTo,
    subject,
    html,
  });
};

export const sendEmailNotification = async ({
  name,
  emailTo,
  verificationToken,
  origin,
  type,
}: SendVerificationEmailInterface): Promise<void> => {
  const emailDetails = {
    verification: {
      subject: "Email Confirmation",
      message: `<p>Please confirm your email by clicking on the following link: 
                <a href="${origin}/user/verify-email?token=${verificationToken}&email=${emailTo}">Verify Email</a></p>`,
    },
    resetPassword: {
      subject: "Reset Password",
      message: `<p>Please reset your password by clicking on the following link: 
                <a href="${origin}/user/forgot-password?token=${verificationToken}&email=${emailTo}">Reset Password</a></p>`,
    },
  };

  const emailContent = emailDetails[type];

  if (!emailContent) {
    throw new BadRequestException("Invalid email type", 400, null);
  }

  await sendEmail({
    emailTo,
    subject: emailContent.subject,
    html: `<h4>Hello, ${name}</h4>${emailContent.message}`,
  });
};

/*
    for ux testing - auth modal 
    token - expires in 1 min & refreshToken: expires in 7d
    token: maxAge 1 min      & refreshToken: maxAge 7d
*/

export const generateToken = (userId: string): TokenResponse => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3m" });
    
  const options: CookieOptions = {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    // maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    maxAge: 1 * 60 * 1000, // 1 minute
  };

  const refreshOptions: CookieOptions = {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 3 * 60 * 1000, // 3 minute
  };

  return { token, refreshToken, options, refreshOptions };
};


export const calculateSessionTime = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload; // Cast to JwtPayload
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = payload.exp - currentTime;
      const isExpiringSoon = remainingTime <= 60;
      console.log(remainingTime);
      return { remainingTime, isExpiringSoon };
    }

    return { remainingTime: 0, isExpiringSoon: true }; // Handle missing exp
  } catch (err) {
    console.error("Invalid or expired token:", (err as Error).message);
    return { remainingTime: 0, isExpiringSoon: true }; // Treat as expired
  }
};

// export const calculateRemainingSessionTime = (token: string, refreshToken: string) => {
//     try {
//       const tokenPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
//       const refreshPayload = jwt.verify(refreshToken, JWT_SECRET) as jwt.JwtPayload;
      
//       const currentTime = Math.floor(Date.now() / 1000);
      
//       // Calculate remaining time for the token
//       const tokenRemainingTime = tokenPayload.exp ? tokenPayload.exp - currentTime : 0;
      
//       // Calculate remaining time for the refresh token
//       const refreshRemainingTime = refreshPayload.exp ? refreshPayload.exp - currentTime : 0;
  
//       const isTokenExpiringSoon = tokenRemainingTime <= 60; // Token is expiring soon
//       const isRefreshTokenExpiringSoon = refreshRemainingTime <= 60; // Refresh token expiring soon
  
//       return {
//         tokenRemainingTime,
//         refreshRemainingTime,
//         isTokenExpiringSoon,
//         isRefreshTokenExpiringSoon,
//       };
//     } catch (err) {
//       console.error("Invalid or expired token:", (err as Error).message);
//       return { tokenRemainingTime: 0, refreshRemainingTime: 0, isTokenExpiringSoon: true, isRefreshTokenExpiringSoon: true };
//     }
// };
  
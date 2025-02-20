import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";

// create for image upload

export const getUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany();
    res.status(200).json({ users });
};

export const uploadAvatar = async (req: Request, res: Response) => {
    console.log('req.body: ', req.file);
    // res.send({ body: req.body ?? 'req.body'})

    res.status(200).json({ message: "Image has been uploaded successfully" });

    // const { userId } = req.params;
    // const { avatar } = req.body;

    // const user = await prismaClient.user.update({
    //     where: {
    //         id: req.user?.id
    //     },
    //     data: avatar,
    // });

    // res.status(200).json({ user });
};

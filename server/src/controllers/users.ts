import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { PutObjectCommand, } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_USER_ACCESS_KEY, AWS_USER_SECRET_ACCESS_KEY } from "../secrets";
import { S3Client, ObjectCannedACL } from "@aws-sdk/client-s3";
import { UpdateUserSchemaValidator } from "../validation/users";
import { NotFoundException } from "../exceptions/not-found";

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_USER_ACCESS_KEY,
      secretAccessKey: AWS_USER_SECRET_ACCESS_KEY,
    },
  });

export const getUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany();
    res.status(200).json({ users });
};

export const uploadAvatar = async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) throw new NotFoundException("No file uploaded", ErrorCode.NOT_FOUND);
    // Extract file extension from mimetype (e.g., "image/png" -> "png")
    const fileExtension = file.mimetype.split("/")[1]; 
    const fileName = file.originalname.substring(0, file.originalname.lastIndexOf(".")); // Get file name without extension :: petcare.jpeg -> petcare | petcare.6.png -> petcare.6 etc.
    const avatarPath = `${fileName}-${req.user?.id}.${fileExtension}`;
    
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `avatars/${avatarPath}`, // Store in "avatars/" folder
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/avatars/${avatarPath}`;

    await prismaClient.user.update({
        where: { id: req?.user?.id },
        data: { avatar: fileUrl },
    });

    res.status(200).json({ fileUrl });
};

export const updateUser = async(req: Request, res: Response) => {
    const validatedData = UpdateUserSchemaValidator.parse(req.body); // returns an object
                              
    const user = await prismaClient.user.update({
        where: { 
            id: req?.user?.id
        },
        data: validatedData
    });

    res.status(200).json({ user });
}



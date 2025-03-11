
import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_USER_ACCESS_KEY, AWS_USER_SECRET_ACCESS_KEY } from "../secrets";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import reimagine from "../services/reimagine-api";

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_USER_ACCESS_KEY,
      secretAccessKey: AWS_USER_SECRET_ACCESS_KEY,
    },
});

export const builder: { 
    createMask: (req: Request, res: Response) => Promise<void>,
    getSpaceType: (req: Request, res: Response) => Promise<void>
} = {
    createMask: async (req: Request, res: Response) => {
        const file = req.file;
        console.log(file);
        if (!file) throw new NotFoundException("No file uploaded", ErrorCode.NOT_FOUND);

        const fileExtension = file.mimetype.split("/")[1]; 
        const fileName = file.originalname.substring(0, file.originalname.lastIndexOf(".")); // Get file name without extension :: petcare.jpeg -> petcare | petcare.6.png -> petcare.6 etc.
        const builderPreview = `${fileName}-${req.user?.id}.${fileExtension}`;
    
        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${builderPreview}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        
        const command = new PutObjectCommand(params);
        // await s3.send(command);
    
        // const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${builderPreview}`;
        const fileUrl = 'https://my-bucket-app-deco.s3.eu-north-1.amazonaws.com/9d7ba3cc-24a5-4cab-819d-057003af00b3-bf6f6ee6-c162-4605-b2a2-10defec77aee.png';

        // const mask = await reimagine.createMask(fileUrl);

        res.status(200).json({ fileUrl });
    },
    getSpaceType: async(req: Request, res: Response) => {
        const spaceType = await reimagine.getSpaceType();
        res.status(200).json({ spaceType });
    }
};
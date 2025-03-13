
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
    getDesignTheme: (req: Request, res: Response) => Promise<void>
} = {
    createMask: async (req: Request, res: Response) => {
        const file = req.file;
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
    
        const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${builderPreview}`;
        
        // const mask = await reimagine.createMask(fileUrl);

        // res.status(200).json({ fileUrl, mask });
        res.status(200).json({ fileUrl: null, mask: null})
    },
    getSpaceType: async(req: Request, res: Response) => {
        const spaceType = await reimagine.getSpaceType();
        res.status(200).json({ spaceType });
    },
    getDesignTheme: async(req: Request, res: Response) => {
        const designThemes = await reimagine.getDesignTheme();
        res.status(200).json({ designThemes });
    }
};

import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_USER_ACCESS_KEY, AWS_USER_SECRET_ACCESS_KEY } from "../secrets";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import reimagine from "../services/reimagine-api";

import { MaskData } from "../types/mask";
import { BadRequestException } from "../exceptions/bad-request";

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_USER_ACCESS_KEY,
      secretAccessKey: AWS_USER_SECRET_ACCESS_KEY,
    },
});

export const builder: { 
    createMask: (req: Request, res: Response) => Promise<void>,
    getSpaceType: (req: Request, res: Response) => Promise<void>,
    getDesignTheme: (req: Request, res: Response) => Promise<void>,
    getMask: (req: Request, res: Response) => Promise<void>
} = {
    createMask: async (req: Request, res: Response) => {
        const { file, body: { maskCategory } } = req;

        if (!file || !maskCategory) throw new NotFoundException("No file uploaded or mask category provided", ErrorCode.NOT_FOUND);

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
        await s3.send(command);
    
        const maskUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${builderPreview}`;

        const maskDataResponse: MaskData = await reimagine.createMask(maskUrl);

        const { status, data: { job_id: jobId, credits_consumed: creditsConsumed } } = maskDataResponse;
        
        // console.log({creditsConsumed});

        const jobMask = await prismaClient.jobMask.create({ 
            data: {
                user: {
                    connect: { id: req.user?.id }
                },
                maskUrl,
                maskCategory,
                status,
                jobId: jobId,
                creditsConsumed,
            },
        })

        res.status(200).json({ data: jobMask })
    },
    getMask: async(req: Request, res: Response) => {
        const maskId = req.query.maskId as string;
        // console.log({ query: req.params });


        if (!maskId) {
            throw new BadRequestException("No mask id provided", 400, null);
        }

        const mask = await prismaClient.jobMask.findFirst({
            where: {
                userId: req.user?.id, // ✅ Ensure correct relation key
                jobId: maskId, // ✅ Ensure maskId is properly typed (string or number)
            }
        });

        if (!mask) throw new NotFoundException("Mask not found", ErrorCode.NOT_FOUND);
       
        res.status(200).json({ mask });
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

// createMask error

// data: {
//     status: 'error',
//     data: {},
//     error_message: 'Image URL size cannot exceed 2048 * 2048 pixels.'
// }
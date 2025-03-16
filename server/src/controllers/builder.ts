
import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_USER_ACCESS_KEY, AWS_USER_SECRET_ACCESS_KEY } from "../secrets";
import { PutObjectCommand, S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

import reimagine from "../services/reimagine-api";

import { JobMask } from "../types/mask";
import { BadRequestException } from "../exceptions/bad-request";

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_USER_ACCESS_KEY,
      secretAccessKey: AWS_USER_SECRET_ACCESS_KEY,
    },
});

// ! prevent images to be uploaded to s3 if they are larger than reimagine's create mask endpoint attributes.

export const builder: { 
    createMask: (req: Request, res: Response) => Promise<Response | void>,
    getSpaceType: (req: Request, res: Response) => Promise<void>,
    getDesignTheme: (req: Request, res: Response) => Promise<void>,
    getMask: (req: Request, res: Response) => Promise<void>
} = {
    createMask: async (req: Request, res: Response) => {
        const { file, body: { maskCategory } } = req;
    
        if (!file || !maskCategory) throw new NotFoundException("No file uploaded or mask category provided", ErrorCode.NOT_FOUND);
    
        const fileExtension = file.mimetype.split("/")[1]; 
        const fileName = file.originalname.substring(0, file.originalname.lastIndexOf(".")); // Get file name without extension
        const builderPreview = `${fileName}-${req.user?.id}.${fileExtension}`;
    
        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${builderPreview}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
    
        try {
            const command = new PutObjectCommand(params);
            await s3.send(command); // ✅ Upload to S3
    
            // Validate if the file exists in S3
            const headParams = { Bucket: AWS_BUCKET_NAME, Key: `${builderPreview}` };
            await s3.send(new HeadObjectCommand(headParams)); // Throws an error if the object doesn't exist
    
            // S3 upload is successful, now generate mask
            const maskUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${builderPreview}`;
    
            const maskDataResponse: JobMask = await reimagine.createMask(maskUrl);
            const { status, data: { job_id: jobId, credits_consumed: creditsConsumed }} = maskDataResponse;
    
            // Store the jobMask only if S3 upload and mask creation succeed
            await prismaClient.jobMask.create({ 
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
            });
    
            res.status(200).end()
        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(error.errorCode).json({ message: error.message });
            }

            return res.status(500).json({ message: "Internal Server Error wpw" });
        }
    },
    getMask: async(req: Request, res: Response) => {
        const maskId = req.query.maskId as string;
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

import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { JobMask } from "../types/mask";
import { BadRequestException } from "../exceptions/bad-request";
import { InternalException } from "../exceptions/internal-exception";

import path from "path";
import reimagine from "../services/reimagine-api";
import s3 from "../utils/s3Client";
import { commonParams } from "@aws-sdk/client-s3/dist-types/endpoint/EndpointParameters";

// ! prevent images to be uploaded to s3 if they are larger than reimagine's create mask endpoint attributes.
export const builder: { 
    createMask: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>,
    getSpaceType: (req: Request, res: Response) => Promise<void>,
    getDesignTheme: (req: Request, res: Response) => Promise<void>,
    getMask: (req: Request, res: Response) => Promise<void>
} = {

    /**
     * Handles mask creation by processing an uploaded image, calling Reimagine API, 
     * storing the jobMask details in the database and returns the `creditsConsumed`.
     * 
     * @description This function handles the process of creating a mask by processing an uploaded image to S3bucket,
     * storing the job details in the database, and returning the `creditsConsumed`.
     * 
     * - the user is charged per this createMask service / 0.5 per request - everytime. Check docs for more.
     * - we store the informations in the database and later in the webhook we process the real payment
     * - the masks are processed by the webhook endpoint - this creates only a jobMaskId based on which masks will be fetched if status == "done"
     * 
     * @returns The response object with the `creditsConsumed`.
     */
    createMask: async (req: Request, res: Response, next: NextFunction) => {
        const { file, body: { maskCategory } } = req;
    
        if (!file || !maskCategory) throw new NotFoundException("No file uploaded or mask category provided", ErrorCode.NOT_FOUND);
    
        const fileExtension = file.mimetype.split("/")[1]; 
        const fileName = path.parse(file.originalname).name;
        const builderPreview = `${fileName}-${req.user?.id}.${fileExtension}`;
    
        try {
            // Upload image to S3
            await s3.setFile(builderPreview, file.buffer, file.mimetype);
            await s3.validate(builderPreview); 
            const maskUrl = s3.getFile(builderPreview);

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
                    jobId,
                    creditsConsumed,
                },
            });
            
            res.status(200).json({ credits: creditsConsumed });
        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(error.errorCode).json({ message: error.message });
            }

            throw new InternalException("Internal Server Error", error, ErrorCode.INTERNAL_EXCEPTION);
        }
    },
    getMask: async(req: Request, res: Response) => {
        const maskId = req.query.maskId as string;

        if (!maskId) {
            throw new BadRequestException("No mask id provided", 400, null);
        }

        const jobMask = await prismaClient.jobMask.findFirst({
            where: {
                userId: req.user?.id, // ✅ Ensure correct relation key
                jobId: maskId, // ✅ Ensure maskId is properly typed (string or number)
            }
        });

        if (!jobMask) throw new NotFoundException("job_mask not found", ErrorCode.NOT_FOUND);

        const masks = await prismaClient.mask.findMany({
            where: {
                jobMaskId: jobMask.id,
            }
        });

        const maskData = {
            masks,
            maskCategory: jobMask.maskCategory, 
            maskUrl: jobMask.maskUrl
        }
                
        res.status(200).json({ data: maskData });
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


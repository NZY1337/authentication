import express, { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { io } from "../utils/socket";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { InternalException } from "../exceptions/internal-exception";

import { Mask } from "../types/mask";
const router = express.Router();

// ! use something else instead of create on mask - maybe the mask with the same id is updated
// ! and we don't want to create another mask mayers but update
router.post("/webhook/mask", async (req: Request, res: Response) => {
    try {
        const { job_id, masks, job_status } = req.body.data;

        if (job_status === "done") {
            const jobMask = await prismaClient.jobMask.findFirst({
                where: { 
                    jobId: job_id,
                    userId: req.user?.id
                },
            });

            if (!jobMask) {
                io.emit("masks_ready", { jobId: null, error: `JobMask with job_id ${job_id} not found!`});
                throw new NotFoundException("JobMask not found", ErrorCode.NOT_FOUND);
            }

            for (const mask of masks) {
                const maskData: Mask = {
                    name: mask.name,
                    url: mask.url,
                    category: mask.category,
                    areaPercent: mask.area_percent,
                    jobMaskId: jobMask.id,
                };
            
                await prismaClient.mask.create({ data: maskData });
            }

            io.emit("masks_ready", { jobId: job_id, error: null});

            return res.status(200).send("Webhook received successfully!");
        }

        if (job_status === "error") {
            console.error("Error in mask processing:", req.body);
            io.emit("masks_ready", { jobId: null, error: "Error in mask processing"});
            throw new BadRequestException("Error in mask processing", 400, null);
        }
    } catch (error) {
        console.error("Error processing webhook:", error);
        io.emit("masks_ready", { jobId: null, error: "Internal server error" });
        throw new InternalException("Internal server error", error, ErrorCode.INTERNAL_EXCEPTION);
    }
});

export default router;

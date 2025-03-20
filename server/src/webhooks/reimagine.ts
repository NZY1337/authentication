import express, { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { io } from "../utils/socket";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { InternalException } from "../exceptions/internal-exception";
import { Mask } from "../types/mask";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import maskMiddleware from "../middlewares/mask";

const router = express.Router();

// ! use something else instead of create on mask - maybe the mask with the same id is updated
// ! and we don't want to create another mask mayers but update
router.post("/webhook/mask", maskMiddleware, async (req: Request, res: Response) => {
    try {
        const { job_id, masks, job_status } = req.body.data;

        const jobMask = await prismaClient.jobMask.findFirst({
            where: { jobId: job_id },
            select: { userId: true, creditsConsumed: true, id: true, jobId: true }
        });

        if (!jobMask) {
            io.emit("masks_ready", { jobId: null, error: `JobMask with job_id ${job_id} not found!` });
            throw new NotFoundException("JobMask not found", ErrorCode.NOT_FOUND);
        }

        if (job_status === "done") {
            console.log(masks);
            
            await Promise.all(
                masks.map((mask: Mask) =>
                    prismaClient.mask.create({
                        data: {
                            name: mask.name,
                            url: mask.url,
                            category: mask.category,
                            areaPercent: new Decimal(mask.area_percent),
                            jobMaskId: jobMask.id,
                            center: {
                                x: new Decimal(mask.center.x),
                                y: new Decimal(mask.center.y),
                            }
                        },
                    })
                )
            );
            
            io.emit("masks_ready", { jobId: job_id, error: null });
            return res.status(200).send("Webhook received successfully!");
        }

        if (job_status === "error") {
            await prismaClient.$transaction(async (tx) => {
                const user = await tx.user.findUnique({
                    where: { id: jobMask.userId },
                    select: { credits: true },
                });

                if (!user) {
                    io.emit("masks_ready", { jobId: null, error: `User not found!` });
                    throw new NotFoundException("JobMask not found", ErrorCode.NOT_FOUND);
                }

                const currentCredits = new Decimal(user.credits) ;
                const creditsConsumed = new Decimal(jobMask.creditsConsumed);

                await tx.user.update({
                    where: { id: jobMask.userId },
                    data: { credits: currentCredits.plus(creditsConsumed) },
                });

                await tx.paymentTransaction.update({
                    where: {
                        referenceId: jobMask.jobId,  
                        userId: jobMask.userId, 
                        transactionType: TransactionType.JOB_MASK,
                    },
                    data: { status: TransactionStatus.REFUNDED },  
                });
            });

            io.emit("masks_ready", { jobId: null, error: "Error in mask processing"});
            throw new BadRequestException("Error in mask processing", 400, null);
        }
    } catch (error) {
        console.error("Webhook error:", error);
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            io.emit("masks_ready", { jobId: null, error: error.message });
            throw error;  // re-throw the actual error 
        }

        io.emit("masks_ready", { jobId: null, error: "Internal server error" });
        throw new InternalException("Internal server error", error, ErrorCode.INTERNAL_EXCEPTION);

    }
});

export default router;

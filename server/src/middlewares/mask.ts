import { Request, Response, NextFunction } from "express";
import { prismaClient } from "..";
import { io } from "../utils/socket";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionStatus, TransactionType } from "@prisma/client";

/**
 * @description REFUND should be made inside the webhook because:
 * - if the job_status == 'failed', it means that the job failed and we should refund the user,
 * - but the refund may add a +creditsConsumed to the user's balance instead of subtracting it
 * - that's because first we should charge the user for the job, and then we should refund the user
 * - paymentMiddleware runs first and if the job_status == 'failed', it doesn't come back inside the middleware again to refund (after the payment)
 * - so first charge the user -> if job_status == 'failed' -> refund the user
 *   1) RUNS The paymentMiddleware -> pay for the services
 *   2) next() to the webhook
 *   3) decide what to do -> if job_error = 'failed' -> refund the user
 */

export const maskMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { job_id, job_status } = req.body.data;

        if (job_status === 'done') {
            const jobMask = await prismaClient.jobMask.findFirst({
                where: { jobId: job_id }, 
                select: { userId: true, creditsConsumed: true, id: true, jobId: true }
            });
            
            if (!jobMask) {
                io.emit("masks_ready", { error: `JobMask with job_id ${job_id} not found!` });
                throw new NotFoundException("JobMask not found", ErrorCode.NOT_FOUND);
            }
            
            const existingUser = await prismaClient.user.findFirst({
                where: { id: jobMask.userId },
                select: { credits: true },
            });
            
            if (!existingUser) {
                throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
            }
            
            const currentCredits = new Decimal(existingUser.credits) ;
            const creditsConsumed = new Decimal(jobMask.creditsConsumed);
            
            // Deduct credits inside a transaction
            await prismaClient.$transaction(async (tx) => {
                await tx.user.update({
                    where: { id: jobMask.userId },
                    data: { credits: currentCredits.toNumber() - creditsConsumed.toNumber() },
                });

                await tx.paymentTransaction.update({
                    where: {
                        referenceId: jobMask.jobId,  // ✅ Find the correct transaction
                        userId: jobMask.userId, 
                        transactionType: TransactionType.JOB_MASK,
                    },
                    data: { status: TransactionStatus.SUCCESS },  // ✅ Update only the status
                });
            
                console.log(`Successfully deducted ${creditsConsumed} credits from user ${jobMask.userId}`);
            });
            
            next();
        }
    } catch(error) {
        console.error("Error in paymentMiddleware:", error);
        next(error);
    }
}

export default maskMiddleware;
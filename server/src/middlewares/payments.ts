import { Request, Response, NextFunction } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { Decimal } from "@prisma/client/runtime/library";
import { InternalException } from "../exceptions/internal-exception";
import { User } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";

/**
 * Middleware to check if a user has enough credits to perform an action.
 * @param requiredCredits - The amount of credits needed for the service.
 */

export const paymentMiddleware = (requiredCredits: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: Pick<User, "credits"> | null = await prismaClient.user.findFirst({
                where: { id: req.user?.id },
                select: { credits: true },
            });
    
            if (!user) {
                return next(new NotFoundException("User not found", ErrorCode.NOT_FOUND));
            }

            const userTotalCredits = user.credits;
            
            if (new Decimal(userTotalCredits).lessThan(new Decimal(requiredCredits))) {
                return next(new BadRequestException("Insufficient credits", ErrorCode.INSUFFICIENT_CREDITS, null))
            }
    
           next();
        } catch (error) {
            console.error("Error in paymentMiddleware:", error instanceof Error ? error.stack : error);

            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                return next(error); 
            }

            return next(new InternalException("Unexpected error checking credits", null, ErrorCode.INTERNAL_EXCEPTION));
        }
    };
};

export default paymentMiddleware;

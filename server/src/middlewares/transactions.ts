import { Request, Response, NextFunction } from "express";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { io } from "../utils/socket";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { Decimal } from "@prisma/client/runtime/library";

export const transactionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
       console.log('paymentMiddleware called');
       next();
    } catch(error) {
        console.error("Error in paymentMiddleware:", error);
        next(error);
    }
}

export default transactionMiddleware;
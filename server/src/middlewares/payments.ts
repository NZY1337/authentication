import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request";

export const paymentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { jobId, creditsConsumed, jobType } = req.body;

        console.log({ jobId, creditsConsumed, jobType });

        if (!jobId || !creditsConsumed || !jobType) {
            throw new BadRequestException("Missing jobId, creditsConsumed, or jobType", 400, null);
        }

        res.status(200).json({ message: "Mask created successfully", credits: creditsConsumed.toNumber() });
    } catch(error) {
        console.log({ error })
        next(error);
    }
}

export default paymentMiddleware;
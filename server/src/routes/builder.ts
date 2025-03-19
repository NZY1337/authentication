import { Router } from "express";

import { builder } from "../controllers/builder";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import paymentMiddleware from "../middlewares/payments";
import multer, { Multer } from 'multer';

const builderRouter: Router = Router();

const upload: Multer = multer({ storage: multer.memoryStorage() });
builderRouter.post("/create-mask", [authMiddleware, upload.single('preview')], errorHandler(builder.createMask));
builderRouter.get("/create-mask", [authMiddleware], errorHandler(builder.getMask));

builderRouter.get("/get-space-type", [authMiddleware], errorHandler(builder.getSpaceType));
builderRouter.get("/get-design-theme", [authMiddleware], errorHandler(builder.getDesignTheme));

export default builderRouter;

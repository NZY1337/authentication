import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { uploadAvatar } from "../controllers/users";
import multer, { Multer } from 'multer';

const usersRouter: Router = Router();
const upload: Multer = multer();

usersRouter.post("/avatar", [authMiddleware, upload.single('avatar')], errorHandler(uploadAvatar));

export default usersRouter;
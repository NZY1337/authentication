import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { uploadAvatar, updateUser } from "../controllers/users";
import multer, { Multer } from 'multer';

const usersRouter: Router = Router();
const upload: Multer = multer({ storage: multer.memoryStorage() });

usersRouter.post("/avatar", [authMiddleware, upload.single('avatar')], errorHandler(uploadAvatar));
usersRouter.put("/", [authMiddleware], errorHandler(updateUser));

export default usersRouter;
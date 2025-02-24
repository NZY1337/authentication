import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";

const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;

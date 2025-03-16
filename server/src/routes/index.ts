import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import builderRouter from "./builder";

const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/builder", builderRouter);

export default rootRouter;

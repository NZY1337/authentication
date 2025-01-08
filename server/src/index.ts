import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
  },
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log("App is working!"));

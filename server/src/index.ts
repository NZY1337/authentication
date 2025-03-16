import express, { Express } from "express";
import { createServer } from "http";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeSocket } from "./utils/socket";
import reimagineWebook from "./webhooks/reimagine";

const app: Express = express();
const server = createServer(app);


app.use(
    cors({
      origin: [
        "http://localhost:5173", // If your frontend is on localhost
      ],
      credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use(reimagineWebook);

app.use((_, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    next();
  });

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
  },
});

app.use(errorMiddleware);

initializeSocket(server);
server.listen(PORT, () => console.log("App is working!"));

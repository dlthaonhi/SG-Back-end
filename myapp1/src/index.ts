import express, { Express, Request, Response } from "express";
import errorHandler from "./middlewares/error.middleware"; // Middleware xử lý lỗi
import router from "./apis";
// import DataSource  from './config/typeorm.config'

import pino from "pino";
const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(express.json());

// DataSource
//   .initialize()
//   .then(() => {
//     logger.info('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     const errorMessage = `Error during Data Source initialization:, ${(err as Error).message}`;
//     logger.error(errorMessage);
//   });
const logger = pino({ name: "server start" });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

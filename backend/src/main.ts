import "dotenv/config"

import express, { json, Request, Response } from "express";
import bearerToken from "express-bearer-token";
import cors from "cors";

import tokenGuard from "./middleware/token.guard";
import userRouter from "./routes/user.routes";
import bookRouter from "./routes/book.routes";
import { AppDataSource } from "./db/data-source";
import { createDemoData } from "./db/demo-data";

const PORT = 8080;

const app = express();

app.use(cors()); // TODO: configure cors
app.use(json());
app.use(bearerToken());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.use("/user", userRouter);

app.use("/book", tokenGuard);
app.use("/book", bookRouter);

AppDataSource.initialize()
  .then(async () => {
    if (process.env.DEMODATA) {
      await createDemoData();
      console.log("Demo data created");
    }
    app.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Could not connect to the database", err);
  });

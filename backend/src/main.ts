import express, { json, Request, Response } from "express";
import bearerToken from "express-bearer-token";

import tokenGuard from "./middleware/token.guard";
import userRouter from "./routes/user.routes";
import bookRouter from "./routes/book.routes";

const PORT = 8080;

const app = express();

app.use(json());
app.use(bearerToken());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.use("/user", userRouter);

app.use("/book", tokenGuard)
app.use("/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

import express, { Request, Response } from "express";

const PORT = 8080;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

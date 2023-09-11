import { Request, Response, Router } from "express";

import { AppDataSource } from "../db/data-source";
import { User } from "../db/entities/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(User);
  res.status(200).json(users);
});

export default router;

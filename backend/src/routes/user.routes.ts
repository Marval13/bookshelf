import { Request, Response, Router } from "express";

import users from "../db/users";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json(users);
});

export default router;

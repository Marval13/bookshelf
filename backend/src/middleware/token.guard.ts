import { NextFunction, Request, Response } from "express";

export const COOKIE_NAME = "user";

function guard(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.token ?? "");
  if (userId) {
    req.userId = userId;
    next();
  } else {
    res.status(401).end();
  }
}

export default guard;

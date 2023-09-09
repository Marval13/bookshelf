import { Request, Response, Router } from "express";

import books from "../db/books";
import users from "../db/users";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const user = users.find((u) => u.id == req.userId);
  if (!user) {
    return res.status(401).end();
  }
  res
    .status(200)
    .json(books.filter((b) => b.user_id == user.id && b.deleted_at == null));
});

router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id == req.userId);
  if (!user) {
    return res.status(401).end();
  }
  const book = books.find(
    (b) =>
      b.id == parseInt(req.params.id) &&
      b.user_id == user.id &&
      b.deleted_at == null
  );
  if (!book) {
    return res.status(404).end();
  }
  res.status(200).json(book);
});

router.post("/", (req: Request, res: Response) => {
  const user = users.find((u) => u.id == req.userId);
  if (!user) {
    return res.status(401).end();
  }
  const newTitle = req.body.title;
  if (!newTitle) {
    return res.status(400).end();
  }
  const newBook = {
    id: Math.max(...books.map((b) => b.id)) + 1,
    title: req.body.title,
    user_id: user.id,
    deleted_at: null,
  };
  books.push(newBook);
  res.status(200).json(newBook);
});

router.patch("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id == req.userId);
  if (!user) {
    return res.status(401).end();
  }
  const book = books.find(
    (b) =>
      b.id == parseInt(req.params.id) &&
      b.user_id == user.id &&
      b.deleted_at == null
  );
  if (!book) {
    return res.status(404).end();
  }
  const newTitle = req.body.title;
  if (!newTitle) {
    return res.status(400).end();
  }
  book.title = newTitle;
  res.status(200).json(book);
});

router.delete("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id == req.userId);
  if (!user) {
    return res.status(401).end();
  }
  const book = books.find(
    (b) =>
      b.id == parseInt(req.params.id) &&
      b.user_id == user.id &&
      b.deleted_at == null
  );
  if (!book) {
    return res.status(404).end();
  }
  book.deleted_at = Date.now();
  res.status(200).json(book);
});

export default router;

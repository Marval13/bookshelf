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
  const title = req.body.title;
  if (!title) {
    return res.status(400).end();
  }
  const author = req.body.author;
  if (!author) {
    return res.status(400).end();
  }
  const isbn = req.body.isbn;
  if (!isbn) {
    return res.status(400).end();
  }
  const summary = req.body.summary;
  if (!summary) {
    return res.status(400).end();
  }
  const newBook = {
    id: Math.max(...books.map((b) => b.id)) + 1,
    title,
    author,
    isbn,
    summary,
    readings: 0,
    user_id: user.id,
    created_at: Date.now(),
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
  const title = req.body.title;
  if (title) {
    book.title = title;
  }
  const author = req.body.author;
  if (author) {
    book.author = author;
  }
  const isbn = req.body.isbn;
  if (isbn) {
    book.isbn = isbn;
  }
  const summary = req.body.summary;
  if (summary) {
    book.summary = summary;
  }
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

router.patch("/:id/read", (req: Request, res: Response) => {
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
  book.readings++;
  res.status(200).json(book);
});

export default router;

import { Request, Response, Router } from "express";

import { AppDataSource } from "../db/data-source";
import { Book } from "../db/entities/Book";

import { User } from "../db/entities/User";
import logger from "../utils/logger";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
    relations: { books: true },
  });

  if (!user) {
    return res.status(401).end();
  }
  res.status(200).json(user.books);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
  });
  if (!user) {
    return res.status(401).end();
  }
  const book = await AppDataSource.manager.findOne(Book, {
    where: { id: parseInt(req.params.id), user },
    relations: { user: true },
  });
  if (!book) {
    return res.status(404).end();
  }
  res.status(200).json(book);
});

router.post("/", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
  });
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

  const book = new Book();
  book.title = title;
  book.author = author;
  book.isbn = isbn;
  book.summary = req.body.summary ?? "";
  book.user = user;
  try {
    res.status(200).json(await AppDataSource.manager.save(book));
  } catch (err) {
    logger.error(err);
    res.status(500).end();
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
  });
  if (!user) {
    return res.status(401).end();
  }
  const book = await AppDataSource.manager.findOne(Book, {
    where: { id: parseInt(req.params.id), user },
    relations: { user: true },
  });
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
  try {
    res.status(200).json(await AppDataSource.manager.save(book));
  } catch (err) {
    logger.error(err);
    res.status(500).end();
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
  });
  if (!user) {
    return res.status(401).end();
  }
  const book = await AppDataSource.manager.findOne(Book, {
    where: { id: parseInt(req.params.id), user },
    relations: { user: true },
  });
  if (!book) {
    return res.status(404).end();
  }
  res.status(200).json(await AppDataSource.manager.softRemove(book));
});

router.patch("/:id/read", async (req: Request, res: Response) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: req.userId },
  });
  if (!user) {
    return res.status(401).end();
  }
  const book = await AppDataSource.manager.findOne(Book, {
    where: { id: parseInt(req.params.id), user },
    relations: { user: true },
  });
  if (!book) {
    return res.status(404).end();
  }
  book.readings++;
  try {
    res.status(200).json(await AppDataSource.manager.save(book));
  } catch (err) {
    logger.error(err);
    res.status(500).end();
  }
});

export default router;

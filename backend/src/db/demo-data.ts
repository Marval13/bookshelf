import { AppDataSource } from "./data-source";
import { Book } from "./entities/Book";
import { User } from "./entities/User";

const demoUsers = [
  {
    id: 1,
    name: "David",
    surname: "Barozzini",
    email: "dbaro13@gmail.com",
  },
  {
    id: 2,
    name: "Pinco",
    surname: "Pallo",
    email: "pallopinco@gmail.com",
  },
];

const demoBooks = [
  {
    id: 1,
    user_id: 1,
    title: "Bea Wolf",
    author: "Zach Weinersmith",
    isbn: "1250776295",
    summary: "",
    readings: 1,
    created_at: 0,
    deleted_at: null,
  },
  {
    id: 2,
    user_id: 1,
    title: "Nimona",
    author: "ND Stevenson",
    isbn: "8865435895",
    summary: "",
    readings: 2,
    created_at: 0,
    deleted_at: null,
  },
  {
    id: 3,
    user_id: 2,
    title: "Il sosia",
    author: "Fëdor Dostoevskij",
    isbn: "8863114439",
    summary: "",
    readings: 0,
    created_at: 0,
    deleted_at: null,
  },
  {
    id: 4,
    user_id: 1,
    title: "Il sosia",
    author: "Fëdor Dostoevskij",
    isbn: "8863114439",
    summary: "",
    readings: 0,
    created_at: 0,
    deleted_at: null,
  },
  {
    id: 5,
    user_id: 2,
    title: "Finzioni",
    author: "Jorge L. Borges",
    isbn: "8845929647",
    summary: "",
    readings: 3,
    created_at: 0,
    deleted_at: null,
  },
];

export async function createDemoData() {
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);
  for (const demoUser of demoUsers) {
    let user = await userRepository.findOneBy({
      id: demoUser.id,
    });
    if (!user) {
      user = new User();
    }
    user.id = demoUser.id;
    user.name = demoUser.name;
    user.surname = demoUser.surname;
    user.email = demoUser.email;
    await userRepository.save(user);

    for (let demoBook of demoBooks.filter((b) => b.user_id == demoUser.id)) {
      const book = new Book();
      book.id = demoBook.id;
      book.title = demoBook.title;
      book.author = demoBook.author;
      book.isbn = demoBook.isbn;
      book.summary = demoBook.summary;
      book.readings = demoBook.readings;
      book.user = user!;
      bookRepository.save(book);
    }
  }
}

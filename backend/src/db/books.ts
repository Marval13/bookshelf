export interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  readings: number;
  deleted_at: number | null;
  created_at: number;
}

const books: Book[] = [
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

export default books;

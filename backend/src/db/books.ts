export interface Book {
  id: number;
  user_id: number;
  title: string;
  deleted_at: number | null;
}

const books: Book[] = [
  {
    id: 1,
    user_id: 1,
    title: "Beawulf",
    deleted_at: null,
  },
  {
    id: 2,
    user_id: 1,
    title: "Nimona",
    deleted_at: null,
  },
  {
    id: 3,
    user_id: 2,
    title: "Il sosia",
    deleted_at: null,
  },
  {
    id: 4,
    user_id: 1,
    title: "Il sosia",
    deleted_at: null,
  },
  {
    id: 5,
    user_id: 2,
    title: "Finzioni",
    deleted_at: null,
  },
];

export default books;

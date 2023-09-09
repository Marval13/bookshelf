export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

const users: User[] = [
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

export default users;

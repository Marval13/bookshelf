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
    summary: `A modern middle-grade graphic novel retelling of Beowulf, featuring a gang of troublemaking kids who must defend their tree house from a fun-hating adult who can instantly turn children into grown-ups.`,
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
    summary: `Nimona vuole diventare la nuova spalla del criminale più cattivo del regno, Lord Ballister Cuorenero.
Sebbene sia molto giovane, è intraprendente, entusiasta, e può trasformarsi in qualunque animale!
Saranno una squadra temibile, insieme.`,
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
    summary:
      "Nella gigantesca macchina gerarchica fatta di ben quattordici ranghi che rovesciava da ogni angolo dell'Impero di Pietroburgo valanghe di carta e fiumi di inchiostro, il singolo burocrate (grande, medio, piccolo) non era in grado di percepire il senso del proprio lavoro; egli era un ingranaggio del sistema, e il sistema non consentiva vie d'uscita.",
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
    summary: `Il mite e umile consigliere Jakòv Petrovic’ Goljadkin non è quello che sembra: vive in lui un doppio, un “sosia”.
Il suo io non è un tutto compatto e unico, bensì un mobile e disintegrabile complesso di impulsi che possono scindersi in altri io, tra loro in alternanza e in conflitto.`,
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
    summary: `Un falso paese scoperto in «un’enciclopedia pirata», Uqbar, e un pianeta immaginario, Tlön, «labirinto ordito da uomini» ma capace di cambiare la faccia del mondo; il "Don Chisciotte" di Menard, identico a quello di Cervantes eppure infinitamente più ricco...
Sono i lemmi di un’enciclopedia illusoria e al tempo stesso, non diversamente da quella di Tlön, di arcana, irresistibile potenza. Un’enciclopedia che ha scompaginato le nostre certezze in materia di letteratura e che tuttavia sembra riflettere il nostro paesaggio interiore – come un’antica mappa che, riaffiorata d’improvviso alla luce, riveli segni e simboli inspiegabilmente familiari. Un’enciclopedia che, forse, avevamo già sognato.`,
    readings: 3,
    created_at: 0,
    deleted_at: null,
  },
];

export async function createDemoData() {
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);
  for (const demoUser of demoUsers) {
    if (
      await userRepository.findOneBy({
        id: demoUser.id,
      })
    ) {
      continue;
    }
    const user = new User();
    user.id = demoUser.id;
    user.name = demoUser.name;
    user.surname = demoUser.surname;
    user.email = demoUser.email;
    await userRepository.save(user);

    for (let demoBook of demoBooks.filter((b) => b.user_id == demoUser.id)) {
      const book = new Book();
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

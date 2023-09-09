import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../interfaces/book';
import { UserService } from './user.service';

const BOOKS: Book[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Bea Wolf',
    author: 'Zach Weinersmith',
    isbn: '1250776295',
    summary: '',
    readings: 1,
  },
  {
    id: 2,
    user_id: 1,
    title: 'Nimona',
    author: 'ND Stevenson',
    isbn: '8865435895',
    summary: '',
    readings: 2,
  },
  {
    id: 3,
    user_id: 2,
    title: 'Il sosia',
    author: 'Fëdor Dostoevskij',
    isbn: '8863114439',
    summary: '',
    readings: 0,
  },
  {
    id: 4,
    user_id: 1,
    title: 'Il sosia',
    author: 'Fëdor Dostoevskij',
    isbn: '8863114439',
    summary: '',
    readings: 0,
  },
  {
    id: 5,
    user_id: 2,
    title: 'Finzioni',
    author: 'Jorge L. Borges',
    isbn: '8845929647',
    summary: '',
    readings: 3,
  },
];

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private userService: UserService) {}

  getBooks(): Observable<Book[]> {
    if (!this.userService.user) {
      return of([]);
    }
    return of(BOOKS.filter((b) => b.user_id == this.userService.user?.id));
  }

  getBook(bookId: number): Observable<Book | undefined> {
    if (!this.userService.user) {
      return of(undefined);
    }
    return of(
      BOOKS.find(
        (b) => b.id == bookId && b.user_id == this.userService.user?.id
      )
    );
  }

  createBook(
    title: string,
    author: string,
    isbn: string,
    summary: string
  ): Observable<Book | undefined> {
    if (!this.userService.user) {
      return of(undefined);
    }
    const book: Book = {
      id: Math.max(...BOOKS.map((b) => b.id)) + 1,
      user_id: this.userService.user?.id,
      title,
      author,
      isbn,
      summary,
      readings: 0,
    };
    BOOKS.push(book);
    return of(book);
  }

  editBook(
    bookId: number,
    title: string,
    author: string,
    isbn: string,
    summary: string
  ): Observable<Book | undefined> {
    if (!this.userService.user) {
      return of(undefined);
    }
    const book = BOOKS.find(
      (b) => b.id == bookId && b.user_id == this.userService.user?.id
    );
    if (!book) {
      return of(undefined);
    }

    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.summary = summary;

    return of(book);
  }

  deleteBook(bookId: number): Observable<Book | undefined> {
    if (!this.userService.user) {
      return of(undefined);
    }
    const index = BOOKS.findIndex(
      (b) => b.id == bookId && b.user_id == this.userService.user?.id
    );
    if (index === -1) {
      return of(undefined);
    }

    const book = BOOKS[index];
    BOOKS.splice(index, 1);

    return of(book);
  }

  addReading(bookId: number): Observable<Book | undefined> {
    if (!this.userService.user) {
      return of(undefined);
    }
    const book = BOOKS.find(
      (b) => b.id == bookId && b.user_id == this.userService.user?.id
    );
    if (!book) {
      return of(undefined);
    }

    book.readings++;
    return of(book);
  }
}

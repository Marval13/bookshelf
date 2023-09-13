import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { baseUrl } from '../constants/constants';
import { Book } from '../interfaces/book';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private userService: UserService, private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${baseUrl}/book/`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        // tap(() => console.log('fetched books')),
        catchError((err) => {
          console.error('error fetching books', err);
          return of([]);
        })
      );
  }

  getBook(bookId: number): Observable<Book | undefined> {
    return this.http
      .get<Book>(`${baseUrl}/book/${bookId}`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        // tap(() => console.log(`fetched book ${bookId}`)),
        catchError((err) => {
          console.error(`error fetching book ${bookId}`, err);
          return of(undefined);
        })
      );
  }

  createBook(
    title: string,
    author: string,
    isbn: string,
    summary: string
  ): Observable<Book | undefined> {
    return this.http
      .post<Book>(
        `${baseUrl}/book/`,
        { title, author, isbn, summary },
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        // tap(() => console.log(`created book`)),
        catchError((err) => {
          console.error(`error creating book`, err);
          return of(undefined);
        })
      );
  }

  editBook(
    bookId: number,
    title?: string,
    author?: string,
    isbn?: string,
    summary?: string
  ): Observable<Book | undefined> {
    return this.http
      .patch<Book>(
        `${baseUrl}/book/${bookId}`,
        { title, author, isbn, summary },
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        // tap(() => console.log(`edited book`)),
        catchError((err) => {
          console.error(`error editing book ${bookId}`, err);
          return of(undefined);
        })
      );
  }

  deleteBook(bookId: number): Observable<Book | undefined> {
    return this.http
      .delete<Book>(`${baseUrl}/book/${bookId}`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        // tap(() => console.log(`deleted book`)),
        catchError((err) => {
          console.error(`error deleting book ${bookId}`, err);
          return of(undefined);
        })
      );
  }

  addReading(bookId: number): Observable<Book | undefined> {
    return this.http
      .patch<Book>(
        `${baseUrl}/book/${bookId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        // tap(() => console.log(`read book`)),
        catchError((err) => {
          console.error(`error reading book ${bookId}`, err);
          return of(undefined);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Book } from '../interfaces/book';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080';

  constructor(private userService: UserService, private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.baseUrl}/book/`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        tap(() => console.log('fetched books')),
        catchError((err) => {
          console.log('error fetching books', err);
          return of([]);
        })
      );
  }

  getBook(bookId: number): Observable<Book | undefined> {
    return this.http
      .get<Book>(`${this.baseUrl}/book/${bookId}`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        tap(() => console.log(`fetched book ${bookId}`)),
        catchError((err) => {
          console.log(`error fetching book ${bookId}`, err);
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
        `${this.baseUrl}/book/`,
        { title, author, isbn, summary },
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        tap(() => console.log(`created book`)),
        catchError((err) => {
          console.log(`error creating book`, err);
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
        `${this.baseUrl}/book/${bookId}`,
        { title, author, isbn, summary },
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        tap(() => console.log(`edited book`)),
        catchError((err) => {
          console.log(`error editing book ${bookId}`, err);
          return of(undefined);
        })
      );
  }

  deleteBook(bookId: number): Observable<Book | undefined> {
    return this.http
      .delete<Book>(`${this.baseUrl}/book/${bookId}`, {
        headers: { Authorization: `Bearer ${this.userService.user?.id}` },
      })
      .pipe(
        tap(() => console.log(`deleted book`)),
        catchError((err) => {
          console.log(`error deleting book ${bookId}`, err);
          return of(undefined);
        })
      );
  }

  addReading(bookId: number): Observable<Book | undefined> {
    return this.http
      .patch<Book>(
        `${this.baseUrl}/book/${bookId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${this.userService.user?.id}` },
        }
      )
      .pipe(
        tap(() => console.log(`read book`)),
        catchError((err) => {
          console.log(`error reading book ${bookId}`, err);
          return of(undefined);
        })
      );
  }
}

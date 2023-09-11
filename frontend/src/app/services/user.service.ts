import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;
  // user: User | null = {
  //   id: 1,
  //   name: 'David',
  //   surname: 'Barozzini',
  //   email: 'dbaro13@gmail.com',
  // };

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<boolean> {
    this.user = user;
    return of(true);
  }

  logout(): Observable<boolean> {
    this.user = null;
    return of(true);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`).pipe(
      tap(() => console.log('fetched users')),
      catchError((err) => {
        console.log('error fetching users', err);
        return of([]);
      })
    );
  }
}

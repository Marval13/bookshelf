import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {}

  login(userId: User) {
    this.user = userId;
    this.router.navigate(['/book']);
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
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

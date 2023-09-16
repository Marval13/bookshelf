import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
// import { baseUrl } from '../constants/constants';
import { environment } from 'src/environments/environment';
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
    return this.http.get<User[]>(`${environment.baseUrl}/user`).pipe(
      // tap(() => console.log('fetched users')),
      catchError((err) => {
        console.error('error fetching users', err);
        return of([]);
      })
    );
  }
}

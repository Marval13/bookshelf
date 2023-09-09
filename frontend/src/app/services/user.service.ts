import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user';

const USERS: User[] = [
  {
    id: 1,
    name: 'David',
    surname: 'Barozzini',
    email: 'dbaro13@gmail.com',
  },
  {
    id: 2,
    name: 'Pinco',
    surname: 'Pallo',
    email: 'pallopinco@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user: User | null = null;
  user: User | null = {
    id: 1,
    name: 'David',
    surname: 'Barozzini',
    email: 'dbaro13@gmail.com',
  };

  constructor(private router: Router) {}

  login(userId: User) {
    this.user = userId;
    this.router.navigate(['/book']);
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}

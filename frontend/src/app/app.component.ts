import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) {}

  public get userName(): string | null {
    return this.userService.user?.name ?? null;
  }

  logout() {
    this.userService.logout();
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { BookFormComponent } from './components/book-form/book-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'book', component: BookListComponent, pathMatch: 'full' },
  { path: 'book/new', component: BookFormComponent, pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailsComponent, pathMatch: 'full' },
  { path: 'book/:id/edit', component: BookFormComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

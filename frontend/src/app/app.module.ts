import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    BookDetailsComponent,
    BookFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

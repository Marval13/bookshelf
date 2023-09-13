import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import isbnValidator from 'src/app/validators/isbn.validator';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  book?: Book;
  loaded = false;
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl('', [Validators.required, isbnValidator]),
    summary: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userService.user) {
      this.router.navigate(['/login']);
    }
    this.getBook();
  }

  private getBook() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) {
      this.loaded = true;
      return;
    }
    this.bookService.getBook(parseInt(bookId)).subscribe((book) => {
      if (!book) {
        this.router.navigate(['/book']);
        return;
      }
      this.book = book;
      this.bookForm.patchValue(book);
      this.loaded = true;
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    if (this.book) {
      this.bookService
        .editBook(
          this.book.id,
          this.bookForm.controls.title.value!,
          this.bookForm.value.author!,
          this.bookForm.value.isbn!,
          this.bookForm.value.summary ?? ''
        )
        .subscribe((b) => {
          if (b) {
            this.router.navigate([`/book/${b.id}`]);
          }
        });
    } else {
      this.bookService
        .createBook(
          this.bookForm.controls.title.value!,
          this.bookForm.value.author!,
          this.bookForm.value.isbn!,
          this.bookForm.value.summary ?? ''
        )
        .subscribe((b) => {
          if (b) {
            this.router.navigate([`/book/${b.id}`]);
          }
        });
    }
  }
}

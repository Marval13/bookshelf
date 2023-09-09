import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book?: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  private getBook() {
    const bookId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.bookService.getBook(bookId).subscribe((book) => (this.book = book));
  }

  addReading() {
    if (!this.book) {
      return;
    }
    this.bookService.addReading(this.book.id).subscribe((b) => {
      this.book = b;
    });
  }

  deleteBook() {
    if (!this.book) {
      return;
    }
    this.bookService.deleteBook(this.book.id).subscribe();
    this.router.navigate(['/book']);
  }
}

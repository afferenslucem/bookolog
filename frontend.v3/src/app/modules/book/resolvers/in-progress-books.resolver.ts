import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class InProgressBooksResolver implements Resolve<Book[]> {
  public constructor(private bookService: BookService) {}

  public async resolve(): Promise<Book[]> {
    const result = await this.bookService.getByStatus(BookStatus.InProgress);

    return result;
  }
}

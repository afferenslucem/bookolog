import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class AllBooksResolver implements Resolve<Book[]> {
  public constructor(private bookService: BookService) {}

  public async resolve(): Promise<Book[]> {
    const books = await this.bookService.getAll();

    return books;
  }
}

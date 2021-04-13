import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class AllBooksResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'AllBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {}

  public async resolve(): Promise<Book[]> {
    const books = await this.bookService.getAll();

    this.logger.debug('Books result: ', books);

    return books;
  }
}

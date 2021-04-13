import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class ToReadBooksResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'ToReadBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {}

  public async resolve(): Promise<Book[]> {
    const result = await this.bookService.getByStatus(BookStatus.ToRead);

    this.logger.debug('Books result: ', result);

    return result;
  }
}

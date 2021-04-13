import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class InProgressBooksResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'InProgressBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {}

  public async resolve(): Promise<Book[]> {
    const result = await this.bookService.getByStatus(BookStatus.InProgress);

    this.logger.debug('Books result: ', result);

    return result;
  }
}

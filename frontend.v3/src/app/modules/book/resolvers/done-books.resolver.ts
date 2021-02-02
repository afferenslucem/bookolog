import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class DoneBooksResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'DoneBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const result = await this.bookService.getByStatus(BookStatus.Done);

    this.logger.debug('Books result: ', result);

    return result;
  }
}

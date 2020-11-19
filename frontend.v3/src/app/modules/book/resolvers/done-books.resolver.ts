import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class DoneBooksResolver {
  private logger = getLogger({
    loggerName: 'DoneBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const books = await this.bookService.getBooks();

    const result = _(books).where(item => item.status === BookStatus.Done).toArray();

    this.logger.debug('Books result: ', result);

    return result;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class InProgressBooksResolver implements Resolve<Book[]> {
  private logger = getLogger({
    loggerName: 'InProgressBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const books = await this.bookService.getBooks();

    this.logger.debug('Books result: ', books);

    return _(books).where(item => item.status === BookStatus.InProgress).toArray();
  }
}

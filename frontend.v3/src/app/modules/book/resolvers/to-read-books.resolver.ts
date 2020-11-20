import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class ToReadBooksResolver implements Resolve<Book[]> {
  private logger = getLogger({
    loggerName: 'ToReadBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const result = await this.bookService.getByStatus(BookStatus.ToRead);

    this.logger.debug('Books result: ', result);

    return result;
  }
}

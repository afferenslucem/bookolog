import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class AllBooksResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'AllBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const books = await this.bookService.getAll();

    this.logger.debug('Books result: ', books);

    return books;
  }
}

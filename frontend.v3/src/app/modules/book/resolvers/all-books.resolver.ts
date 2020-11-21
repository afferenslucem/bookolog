import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class AllBooksResolver {
  private logger = getLogger({
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

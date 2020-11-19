import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class BookResolver {
  private logger = getLogger({
    loggerName: 'BookResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book> {
    const guid = route.paramMap.get('guid');

    const book = await this.bookService.getByGuid(guid);

    this.logger.debug('Book result: ', book);

    return book;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import _ from 'declarray';

@Injectable({providedIn: 'root'})
export class BooksByAuthorResolver implements Resolve<Book[]> {
  private logger = getLogger({
    loggerName: 'BooksByAuthorResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const targetAuthor = route.paramMap.get('filter');

    const books = await this.bookService.getByStatus(BookStatus.Done);

    return await _(books)
      .where(item => _(item.authors).contains(targetAuthor))
      .promisify()
      .toArray();
  }
}

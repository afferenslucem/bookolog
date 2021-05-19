import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import _ from 'declarray';
import { getConsoleLogger } from '../../../main/app.logging';
import { StringComparator } from '../../../main/utils/string-comparator';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BooksByAuthorResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'BooksByAuthorResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Book[]> {
    const targetAuthor = route.paramMap.get('filter');

    const books = await this.bookService.getByStatus(BookStatus.Done);

    return await _(books)
      .where(item => _(item.authors).contains(targetAuthor, new StringComparator()))
      .promisify()
      .toArray();
  }
}

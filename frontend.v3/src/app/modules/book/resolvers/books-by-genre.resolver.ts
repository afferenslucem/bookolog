import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getConsoleLogger } from '../../../main/app.logging';
import { StringComparer } from '../../../main/utils/string.comparer';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class BooksByGenreResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'BooksByGenreResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const targetGenre = route.paramMap.get('filter');

    const books = await this.bookService.getByStatus(BookStatus.Done);

    return await _(books)
      .where(item => new StringComparer().equal(item.genre, targetGenre))
      .promisify()
      .toArray();
  }
}

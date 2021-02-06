import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getConsoleLogger } from '../../../main/app.logging';
import { StringComparer } from '../../../main/utils/string.comparer';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class BooksByYearResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'BooksByYearResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const year = Number(route.paramMap.get('filter'));

    const filter = Number.isInteger(year) ? Number(year) : null;

    const books = await this.bookService.getByYear(filter);

    return books;
  }
}

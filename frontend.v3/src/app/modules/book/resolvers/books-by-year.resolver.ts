import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
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

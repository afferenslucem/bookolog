import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BooksByYearResolver implements Resolve<Book[]> {
  public constructor(private bookService: BookService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Book[]> {
    const year = Number(route.paramMap.get('filter'));

    const filter = Number.isInteger(year) ? Number(year) : null;

    const books = await this.bookService.getByYear(filter);

    return books;
  }
}

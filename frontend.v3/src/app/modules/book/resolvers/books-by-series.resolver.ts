import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import _ from 'declarray';

@Injectable({ providedIn: 'root' })
export class BooksBySeriesResolver implements Resolve<Book[]> {
  public constructor(private bookService: BookService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Book[]> {
    const seriesGuid = route.paramMap.get('guid');

    const books = await this.bookService.getByCollection(seriesGuid);

    return _(books)
      .where(item => item.rereadingBookGuid == null)
      .toArray();
  }
}

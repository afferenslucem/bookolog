import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { StringComparer } from '../../../main/utils/string.comparer';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class BooksBySeriesResolver implements Resolve<Book[]> {
  private logger = getLogger({
    loggerName: 'BooksBySeriesResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const seriesGuid = route.paramMap.get('guid');

    const books = await this.bookService.getBySeries(seriesGuid);

    return books;
  }
}

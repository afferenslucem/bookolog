import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import _ from 'declarray';
import {EntityComparer} from "../../../main/utils/entity.comparer";

@Injectable({providedIn: 'root'})
export class BooksBySeriesResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'BooksBySeriesResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Book[]> {
    const seriesGuid = route.paramMap.get('guid');

    const books = await this.bookService.getByCollection(seriesGuid);

    return _(books).where(item => item.rereadingBookGuid == null).toArray();
  }
}

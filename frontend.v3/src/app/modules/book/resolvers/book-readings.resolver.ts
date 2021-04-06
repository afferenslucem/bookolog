import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { CollectionService } from '../../collection/services/collection.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BookReadingsResolver implements Resolve<Book[]> {
  private logger = getConsoleLogger({
    loggerName: 'BookReadingsResolver',
    namespace: 'Resolver',
  });

  public constructor(
    private bookService: BookService,
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Book[]> {
    const guid = route.paramMap.get('guid');

    const books = await this.bookService.getAllReadings(guid);

    this.logger.debug('Book result: ', books);

    return books;
  }
}

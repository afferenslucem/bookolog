import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { CollectionService } from '../../collection/services/collection.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  private logger = getConsoleLogger({
    loggerName: 'BookResolver',
    namespace: 'Resolver',
  });

  public constructor(
    private bookService: BookService,
    private collectionService: CollectionService
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Book> {
    const guid = route.paramMap.get('guid');

    const book = await this.bookService.getByGuid(guid);

    if (book.collectionGuid) {
      book.collection = await this.collectionService.getByGuid(book.collectionGuid);
    }

    this.logger.debug('Book result: ', book);

    return book;
  }
}

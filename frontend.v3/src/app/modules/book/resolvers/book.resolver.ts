import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CollectionService } from '../../collection/services/collection.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book> {
  public constructor(private bookService: BookService, private collectionService: CollectionService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Book> {
    const guid = route.paramMap.get('guid');

    const book = await this.bookService.getByGuid(guid);

    if (book.collectionGuid) {
      book.collection = await this.collectionService.getByGuid(book.collectionGuid);
    }

    return book;
  }
}

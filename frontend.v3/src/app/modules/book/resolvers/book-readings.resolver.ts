import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class BookReadingsResolver implements Resolve<Book[]> {
  public constructor(private bookService: BookService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Book[]> {
    const guid = route.paramMap.get('guid');

    const books = await this.bookService.getAllReadings(guid);

    return books;
  }
}

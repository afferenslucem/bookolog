import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { BookStatus } from '../models/book-status';

@Injectable({ providedIn: 'root' })
export class BookStatusResolver implements Resolve<BookStatus> {
  public resolve(route: ActivatedRouteSnapshot): BookStatus {
    const bookStatusStr = route.paramMap.get('status');

    const bookStatus = Number(bookStatusStr) as BookStatus;

    return bookStatus;
  }
}

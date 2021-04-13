import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { BookStatus } from '../models/book-status';

@Injectable({ providedIn: 'root' })
export class BookStatusResolver implements Resolve<BookStatus> {
  private logger = getConsoleLogger({
    loggerName: 'ActionResolver',
    namespace: 'Resolver',
  });

  public resolve(route: ActivatedRouteSnapshot): BookStatus {
    const bookStatusStr = route.paramMap.get('status');

    const bookStatus = Number(bookStatusStr) as BookStatus;

    this.logger.debug('Book type result: ', bookStatus);

    return bookStatus;
  }
}

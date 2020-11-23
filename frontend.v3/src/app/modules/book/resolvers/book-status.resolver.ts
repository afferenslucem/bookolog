import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { BookStatus } from '../models/book-status';

@Injectable({providedIn: 'root'})
export class BookStatusResolver implements Resolve<BookStatus> {
  private logger = getLogger({
    loggerName: 'ActionResolver',
    namespace: 'Resolver',
  });

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BookStatus> {
    const bookStatusStr = route.paramMap.get('status');

    const bookStatus = Number(bookStatusStr) as BookStatus;

    this.logger.debug('Book type result: ', bookStatus);

    return bookStatus;
  }
}

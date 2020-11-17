import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { getLogger } from '../../../app.logging';
import { Book } from '../models/book';

@Injectable({providedIn: 'root'})
export class InProgressBooksResolver implements Resolve<Book> {
  private logger = getLogger({
    loggerName: 'InProgressBooksResolver',
    namespace: 'Resolver',
  });

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> | Promise<Book> | Book {
    this.logger.debug('Woo-hoo');
    return undefined;
  }
}

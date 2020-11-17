import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { getLogger } from '../../../app.logging';
import { UserService } from '../../user/services/user.service';
import { Book } from '../models/book';
import _ from 'declarray';
import { BookData } from '../models/book-data';

@Injectable({
  providedIn: 'root',
})
export class BookOriginService {
  private logger = getLogger({
    loggerName: 'BookOriginService',
    namespace: 'Origin',
  });

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  public async getAll(): Promise<Book[]> {
    const userId = this.userService.user.id;
    return this.httpClient.get<BookData[]>(`/book/user/${userId}`).pipe(
      map(data => _(data).select(item => new Book(item)).toArray()),
      tap(books => this.logger.debug('Loaded books: ', books)),
    ).toPromise();
  }
}

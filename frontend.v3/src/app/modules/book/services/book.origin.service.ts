import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ISyncableOrigin } from 'src/app/main/services/i-syncable-origin';
import { getConsoleLogger } from '../../../main/app.logging';
import { SyncData } from '../../../main/models/sync-data';
import { UserService } from '../../user/services/user.service';
import { BookData } from '../models/book-data';

@Injectable({
  providedIn: 'root',
})
export class BookOriginService implements ISyncableOrigin<BookData> {
  private logger = getConsoleLogger({
    loggerName: 'BookOriginService',
    namespace: 'Origin',
  });

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  public async getAll(): Promise<BookData[]> {
    const userId = this.userService.user.id;
    return this.httpClient.get<BookData[]>(`/book/user/${userId}`).pipe(
      tap(books => this.logger.debug('Loaded books: ', books)),
    ).toPromise();
  }

  public async delete(guid: string): Promise<void> {
    return await this.httpClient.delete<void>('/book/delete/' + guid).toPromise();
  }

  public async sync(data: SyncData<BookData>): Promise<SyncData<BookData>> {
    return await this.httpClient.post<SyncData<BookData>>('/book/synchronize/', data).toPromise();
  }
}

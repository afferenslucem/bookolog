import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { getLogger } from '../../../main/app.logging';
import { UserService } from '../../user/services/user.service';
import { BookData } from '../models/book-data';
import { RemoteSyncData } from '../../../main/models/i-remote-sync-data';
import { SyncData } from '../../../main/models/i-local-sync-data';
import { ISyncableOrigin } from 'src/app/main/services/i-syncable-origin';

@Injectable({
  providedIn: 'root',
})
export class BookOriginService implements ISyncableOrigin<BookData> {
  private logger = getLogger({
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

  public async sync(data: SyncData<BookData>): Promise<RemoteSyncData<BookData>> {
    return await this.httpClient.post<RemoteSyncData<BookData>>('/book/synchronize/', data).toPromise();
  }
}

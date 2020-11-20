import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { getLogger } from '../../../main/app.logging';
import { UserService } from '../../../main/services/user.service';
import { BookData } from '../models/book-data';

export interface SyncData {
  localUpdated: BookData[];
  localDeleted: BookData[];
}

export interface RemoteSyncData {
  update: BookData[];
  delete: BookData[];
}

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

  public async getAll(): Promise<BookData[]> {
    const userId = this.userService.user.id;
    return this.httpClient.get<BookData[]>(`/book/user/${userId}`).pipe(
      tap(books => this.logger.debug('Loaded books: ', books)),
    ).toPromise();
  }

  public async delete(guid: string): Promise<void> {
    return await this.httpClient.delete<void>('/book/delete/' + guid).toPromise();
  }

  public async sync(data: SyncData): Promise<RemoteSyncData> {
    return await this.httpClient.post<RemoteSyncData>('/book/synchronize/', data).toPromise();
  }
}

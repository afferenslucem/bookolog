import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISyncableOrigin } from 'src/app/main/services/i-syncable-origin';

import { SyncData } from '../../../main/models/sync-data';
import { UserService } from '../../user/services/user.service';
import { BookData } from '../models/book-data';

@Injectable({
  providedIn: 'root',
})
export class BookOriginService implements ISyncableOrigin<BookData> {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  public async getAll(): Promise<BookData[]> {
    const userId = this.userService.user.id;
    return this.httpClient.get<BookData[]>(`/book/user/${userId}`).toPromise();
  }

  public async create(book: BookData): Promise<BookData> {
    return await this.httpClient.post<BookData>('/book/create/', book).toPromise();
  }

  public async update(book: BookData): Promise<BookData> {
    return await this.httpClient.put<BookData>('/book/update/', book).toPromise();
  }

  public async delete(guid: string): Promise<void> {
    return await this.httpClient.delete<void>('/book/delete/' + guid).toPromise();
  }

  public async sync(data: SyncData<BookData>): Promise<SyncData<BookData>> {
    return await this.httpClient.post<SyncData<BookData>>('/book/synchronize/', data).toPromise();
  }
}

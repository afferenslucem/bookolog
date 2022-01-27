import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SyncData } from '../../../main/models/sync-data';
import { ISyncableOrigin } from '../../../main/services/i-syncable-origin';
import { UserService } from '../../user/services/user.service';
import { CollectionData } from '../models/collection-data';

@Injectable({
  providedIn: 'root',
})
export class CollectionOriginService implements ISyncableOrigin<CollectionData> {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  public async getAll(): Promise<CollectionData[]> {
    const userId = this.userService.user.id;
    return this.httpClient.get<CollectionData[]>(`/collection/user/${userId}`).toPromise();
  }

  public async create(collection: CollectionData): Promise<CollectionData> {
    return await this.httpClient.post<CollectionData>('/collection/create/', collection).toPromise();
  }

  public async update(collection: CollectionData): Promise<CollectionData> {
    return await this.httpClient.put<CollectionData>('/collection/update/', collection).toPromise();
  }

  public async delete(guid: string): Promise<void> {
    return await this.httpClient.delete<void>('/collection/delete/' + guid).toPromise();
  }

  public async sync(data: SyncData<CollectionData>): Promise<SyncData<CollectionData>> {
    return await this.httpClient.post<SyncData<CollectionData>>('/collection/synchronize/', data).toPromise();
  }
}

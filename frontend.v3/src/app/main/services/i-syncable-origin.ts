import { SyncData } from '../models/sync-data';

export interface ISyncableOrigin<T> {
  sync(data: SyncData<T>): Promise<SyncData<T>>;

  delete(guid: string): Promise<void>;

  getAll(): Promise<T[]>;
}

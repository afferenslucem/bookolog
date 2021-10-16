import { SyncData } from '../models/sync-data';

export interface ISyncableOrigin<T> {
  sync(data: SyncData<T>): Promise<SyncData<T>>;

  create(data: T): Promise<T>;

  update(data: T): Promise<T>;

  delete(guid: string): Promise<void>;

  getAll(): Promise<T[]>;
}

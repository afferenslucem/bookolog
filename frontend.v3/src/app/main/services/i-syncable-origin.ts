import { SyncData } from "../models/i-local-sync-data";
import { RemoteSyncData } from "../models/i-remote-sync-data";

export interface ISyncableOrigin<T> {
    sync(data: SyncData<T>): Promise<RemoteSyncData<T>>;
}
import { IDeletable } from "../models/i-deletable";
import _ from 'declarray';
import { IUpdatable } from "../models/i-updatable";
import { IStorage } from "./i-storage";
import { ISyncableOrigin } from "./i-syncable-origin";
import { IEntity } from "../models/i-entity";
import { RemoteSyncData } from "../models/i-remote-sync-data";

export class EntityService {
    private getLocalDeleted<T extends IDeletable>(entities: T[]): T[] {
        return _(entities).where(item => item.deleted).toArray();
    }

    private getLocalUpdated<T extends IUpdatable>(entities: T[]): T[] {
        return _(entities).where(item => item.shouldSync).toArray();
    }

    protected async genericSync<T extends IEntity>(storage: IStorage<T>, origin: ISyncableOrigin<T>): Promise<void> {
        const allBooks = await storage.getAll();
    
        const deletedToSync: T[] = this.getLocalDeleted(allBooks);
        const updatedToSync: T[] = this.getLocalUpdated(allBooks);
    
        const remoteSyncData: RemoteSyncData<T> = await origin.sync({
            delete: deletedToSync.map(item => item.guid),
            update: updatedToSync,
        });
    
        const toDelete: T[] = _(remoteSyncData.delete)
            .concat(deletedToSync)
            .toArray();
    
        const toUpdate: T[] = _(updatedToSync)
            .select(item => {
            item.shouldSync = false;
            return item;
            })
            .concat(remoteSyncData.update)
            .toArray();
    
        const deleting = storage.deleteMany(toDelete);
        const updating = storage.updateMany(toUpdate);
    
        await Promise.all([updating, deleting]);
    }
}
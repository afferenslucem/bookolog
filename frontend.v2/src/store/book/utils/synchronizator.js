import { BookRepository } from '../../../storage/book-repository';
import { BookEqualityComparer } from '../../../models/book';
import { BookClient } from '../../../http/book-client';
import _ from 'declarray';

export class BookSynchronizator {
    constructor(repository, client) {
        this.repository = repository || new BookRepository();
        this.client = client || new BookClient();
    }

    async sync(userId) {
        const [local, origin] = await this.loadAllBooks(userId);

        const diff = this.computeSyncData(local, origin);

        const originSynched = await this.syncRemote(diff);

        await this.syncLocal(diff, originSynched);

        return this.composeActual(diff);
    }

    async loadAllBooks(userId) {
        const [localBooks, originBooks] = await Promise.all([this.repository.allBooks(), this.client.getAll(userId)])

        return [_(localBooks), _(originBooks)];
    }

    computeSyncData(local, origin) {
        const comparer = new BookEqualityComparer();

        const localCreated = local.except(origin, comparer).where(item => !!item.shouldSync).toArray();
        const originCreated = origin.except(local, comparer).toArray();

        const localDeleted = local.where(item => !!item.deleted).toArray();
        const originDeleted = local.except(origin.concat(localCreated), comparer).toArray();

        const joined = local.join(origin, loc => loc.guid, or => or.guid, (loc, or) => ({local: loc, origin: or}));

        const originUpdated = joined
        .where(item => +item.origin.modifyDate > +item.local.modifyDate)
        .select(item => item.origin)
        .toArray();
        
        const localUpdated = joined
        .where(item => +item.origin.modifyDate < +item.local.modifyDate)
        .select(item => item.local)
        .toArray();

        const persist = joined
        .where(item => +item.origin.modifyDate == +item.local.modifyDate)
        .select(item => item.local)
        .except(localDeleted, comparer)
        .toArray()

        return {
            localCreated,
            localUpdated,
            localDeleted,
            originCreated,
            originUpdated,
            originDeleted,
            persist
        }
    }

    syncRemote(syncData) {
        return this.client.sync({
            'add': syncData.localCreated,
            'update': syncData.localUpdated,
            'deleteGuids': _(syncData.localDeleted).select(item => item.guid).toArray(),
        })
    }

    syncLocal(diff, originSynched) {
        const deleteAwait = this.repository.deleteManyBooks(_(diff.localDeleted).concat(originSynched.delete).concat(diff.originDeleted).toArray());
        const updateAwait = this.repository.updateManyBooks(_(diff.originUpdated).concat(originSynched.add).toArray())
        const saveAwait = this.repository.saveManyBooks(diff.originCreated);

        return Promise.all([saveAwait, updateAwait, deleteAwait])
    }

    composeActual(diff) {
        return _(diff.localCreated)
        .concat(diff.localUpdated)
        .concat(diff.originCreated)
        .concat(diff.originUpdated)
        .concat(diff.persist)
        .toArray()
    }
}
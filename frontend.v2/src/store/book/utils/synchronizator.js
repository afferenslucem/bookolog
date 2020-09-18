import { getLogger } from '../../../logger';
import { BookRepository } from '../../../storage/book-repository';
import { BookEqualityComparer } from '../../../models/book';
import { BookClient } from '../../../http/book-client';
import { 
    NETWORK_ERROR,
} from '../../naming';
import _ from 'declarray';
import moment from 'moment'

const logger = getLogger({
    loggerName: 'BookSynchronizator'
});

export class BookSynchronizator {
    constructor(repository, client) {
        this.repository = repository || new BookRepository();
        this.client = client || new BookClient();
    }

    async saveBook(book, onOffline = () => {}, onOnline = () => {}) {
        try {
            book = await this.client.create(book);
            await onOnline();
        } catch (e) {
            logger.debug(e);

            if(e == NETWORK_ERROR) {
                book.shouldSync = true;
                await onOffline();
            } else {
                logger.error('Unexpected error:', e)
                throw e
            }
        }

        return await this.repository.saveBook(book);
    }

    async updateBook(book, onOffline = () => {}, onOnline = () => {}) {
        book.modifyDate = moment(new Date()).format();

        try {
            book = await this.client.update(book);
            await onOnline();
        } catch (e) {
            if(e == NETWORK_ERROR) {
                await onOffline();
            } else {
                logger.error('Unexpected error:', e)
                throw e;
            }
        }
        
        return await this.repository.updateBook(book);
    }

    async deleteBook(guid, onOffline = () => {}, onOnline = () => {}) {
        try {
            await this.client.delete(guid);
            await onOnline();
        } catch (e) {
            if(e == NETWORK_ERROR) {
                await onOffline()
            } else {
                logger.error('Unexpected error:', e)
                throw e;
            }
        }

        await this.repository.deleteBook(guid);
    }

    async loadBook(guid, onOffline = () => {}, onOnline = () => {}) {
        try {
            const book = await this.client.getById(guid);
            await onOnline();

            await this.repository.saveBook(book);

            return book;
        } catch (e) {
            if(e == NETWORK_ERROR) {
                await onOffline()
            } else {
                logger.error('Unexpected error:', e)
                throw e;
            }
        }
    }

    async sync(userId, onOffline = () => {}, onOnline = () => {}) {
        let isOnline = true;

        let [local, origin] = await this.loadAllBooks(userId, () => {
            isOnline = false;
           async () => await onOffline();
        }, async () => await onOnline);

        if (isOnline) {
            const diff = this.computeSyncData(local, origin);

            const originSynched = await this.syncRemote(diff);

            await this.syncLocal(diff, originSynched);

            return this.composeActual(diff);
        } else {
            return local.toArray();
        }
    }

    async loadAllBooks(userId, onOffline, onOnline) {
        const originAwait = this.client.getAll(userId);

        const local = await this.repository.allBooks();

        try {
            const origin = await originAwait;
            await onOnline();

            return [_(local), _(origin)];
        } catch (e) {
            logger.debug(e);

            if(e == NETWORK_ERROR) {
                await onOffline();
                return [_(local), _.empty()];
            } else {
                logger.error('Unexpected error:', e)
                throw e
            }
        }
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
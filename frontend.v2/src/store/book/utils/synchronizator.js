import {
    getLogger
} from '../../../logger';
import {
    BookRepository
} from '../../../storage/book-repository';
import {
    BookClient
} from '../../../http/book-client';
import _ from 'declarray';
import {
    NETWORK_ERROR
} from '@/http/client';
import {
    getUtcDate
} from '@/utils/utc-date';

const logger = getLogger({
    loggerName: 'BookSynchronizator'
});

export class BookSynchronizator {
    constructor(repository, client) {
        this.repository = repository || new BookRepository();
        this.client = client || new BookClient();
    }

    get now() {
        const now = getUtcDate();
        return now;
    }

    async saveBook(book, onOffline = () => {}, onOnline = () => {}) {
        try {
            book.createDate = this.now;
            book.modifyDate = this.now;

            book = await this.client.create(book);
            await onOnline();
        } catch (e) {
            logger.debug(e);

            if (e == NETWORK_ERROR) {
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
        book.modifyDate = this.now;

        try {
            book = await this.client.update(book);
            await onOnline();
        } catch (e) {
            if (e == NETWORK_ERROR) {
                book.shouldSync = true;
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
            if (e == NETWORK_ERROR) {
                await onOffline()
                return;
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

            await this.repository.updateBook(book);

            return book;
        } catch (e) {
            if (e == NETWORK_ERROR) {
                await onOffline()
            } else {
                logger.error('Unexpected error:', e)
                throw e;
            }
        }
    }

    async sync() {
        let isOnline = true;

        const local = await this.repository.allBooks();

        if (isOnline) {
            const diff = this.computeSyncData(_(local));

            const originSynched = await this.syncRemote(diff);

            await this.syncLocal(originSynched);

            return await this.repository.allBooks();
        } else {
            return local.toArray();
        }
    }

    async loadAllRemoteBooks(userId, onOffline = () => {}, onOnline = () => {}) {
        try {
            const origin = await this.client.getAll(userId);
            await onOnline();

            return origin;
        } catch (e) {
            logger.warn(e);

            if (e == NETWORK_ERROR) {
                await onOffline();
                return null;
            } else {
                logger.error('Unexpected error:', e)
                throw e
            }
        }
    }

    computeSyncData(local) {
        const localUpdated = local.where(item => !!item.shouldSync).toArray();

        const localDeleted = local.where(item => !!item.deleted).toArray();

        return {
            localUpdated,
            localDeleted,
        }
    }

    syncRemote(syncData) {
        return this.client.sync({
            'update': syncData.localUpdated,
            'deleteGuids': _(syncData.localDeleted).select(item => item.guid).toArray(),
        })
    }

    syncLocal(originSynched) {
        const deleteAwait = this.repository.deleteManyBooks(originSynched.delete);
        const updateAwait = this.repository.updateManyBooks(originSynched.update);

        return Promise.all([updateAwait, deleteAwait])
    }
}
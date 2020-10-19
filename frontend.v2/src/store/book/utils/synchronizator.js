import {
    getLogger
} from '@/logger';
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

    async saveBook(book) {
        try {
            book.createDate = this.now;
            book.modifyDate = this.now;

            book = await this.client.create(book);

            await this.repository.saveBook(book);

            return book;
        } catch (e) {
            logger.debug(e);

            if (e == NETWORK_ERROR) {
                book.shouldSync = true;

                await this.repository.saveBook(book);
            } else {
                logger.error('Unexpected error:', e)
            }

            throw e;
        }
    }

    async updateBook(book) {
        book.modifyDate = this.now;

        try {
            book = await this.client.update(book);
            return book;
        } catch (e) {
            if (e == NETWORK_ERROR) {
                book.shouldSync = true;
            } else {
                logger.error('Unexpected error:', e)
            }

            throw e;
        } finally {
            await this.repository.updateBook(book)
        }
    }

    async updateBooks(books) {
        try {
            books = await this.client.updateMany(books);
            return books;
        } catch (e) {
            if (e == NETWORK_ERROR) {
                _(books).select(book => {
                    book.shouldSync = true;
                }).toArray();
            } else {
                logger.error('Unexpected error:', e)
            }

            throw e;
        } finally {
            await this.repository.updateManyBooks(books)
        }
    }

    async deleteBook(guid) {
        try {
            await this.client.delete(guid);

            await this.repository.deleteBook(guid);
        } catch (e) {
            if (e == NETWORK_ERROR) {
                //
            } else {
                logger.error('Unexpected error:', e)
            }

            throw e;
        }
    }

    async loadBook(guid) {
        try {
            const book = await this.client.getById(guid);

            await this.repository.updateBook(book);

            return book;
        } catch (e) {
            if (e == NETWORK_ERROR) {
                //
            } else {
                logger.error('Unexpected error:', e)
            }
            throw e;
        }
    }

    async sync() {
        const local = await this.repository.allBooks();

        const diff = this.computeSyncData(_(local));

        const originSynched = await this.syncRemote(diff);

        await this.syncLocal(originSynched, diff);

        return await this.repository.allBooks();
    }

    async loadAllRemoteBooks(userId) {
        const origin = await this.client.getAll(userId);

        return origin;
    }

    computeSyncData(local) {
        const localUpdated = local.where(item => !!item.shouldSync && !item.deleted).toArray();

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

    syncLocal(originSynched, diff) {
        const deleteAwait = this.repository.deleteManyBooks(originSynched.delete.concat(diff.localDeleted));
        const updateAwait = this.repository.updateManyBooks(originSynched.update);

        return Promise.all([updateAwait, deleteAwait])
    }
}
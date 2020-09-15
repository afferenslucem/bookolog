import { Client } from "./client";
import _ from "declarray";
import {getLogger} from '../logger';
import { Book }from '../models/book'
import { BACKEND_URL } from "./config";

export class BookClient extends Client {
    constructor() {
        super(BACKEND_URL);
        this.logger = getLogger({
            namespace: 'Http',
            loggerName: 'BookClient'
        });
    }

    async getAll(userId) {
        const data = await super.get(`book/user/${userId}`);
        this.logger.debug('books', data);

        return _(data.data).select(item => new Book(item)).toArray();
    }

    async getById(bookId) {
        const book = await super.get(`book/get/${bookId}`);
        this.logger.debug('book', book.data);

        return new Book(book.data);
    }

    async create(book) {
        const created = await super.post(`book/create`, book, {
            withCredentials: true
        });

        this.logger.debug('created', created.data);
        return new Book(created.data);
    }

    async update(book) {
        const update = await super.put(`book/update`, book, {
            withCredentials: true
        });

        this.logger.debug('update', update.data);
        return new Book(update.data);
    }

    async delete(bookId) {
        const deleted = await super.delete(`book/delete/${bookId}`, {
            withCredentials: true
        });

        this.logger.debug('deleted', deleted.data);
        return new Book(deleted.data);
    }

    async sync(syncData) {
        const synced = await super.post('book/synchronize', syncData, {
            withCredentials: true
        });

        return synced.data;
    }
}
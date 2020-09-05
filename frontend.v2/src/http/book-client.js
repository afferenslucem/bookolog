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
        this.logger.debug('book', book);

        return  new Book(book);
    }

    async create(book) {
        const created = await super.post(`book/create`, book, {
            withCredentials: true
        });

        this.logger.debug('created', created);
        return new Book(created);
    }

    async update(book) {
        const update = await super.post(`book/update`, book, {
            withCredentials: true
        });

        this.logger.debug('update', update);
        return new Book(update);
    }

    async delete(bookId) {
        const deleted = await super.post(`book/delete/${bookId}`, {
            withCredentials: true
        });

        this.logger.debug('deleted', deleted);
        return new Book(deleted);
    }
}
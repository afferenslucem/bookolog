import { Client } from "./client";
import _ from "declarray";
import {getLogger} from '../logger';
import { Book }from '../models/book'

export class BookClient extends Client {
    constructor() {
        super();
        this.logger = getLogger('BookClient');
    }

    async getAll() {
        const data = await super.get('/books.json');
        this.logger.debug('books', data);
        return _(data.data).select(item => new Book(item)).toArray();
    }
}
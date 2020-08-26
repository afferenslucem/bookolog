import { Repository } from "./repository";
import { getLogger } from '@/logger'
import { Exceptions } from "./exceptions";

const ENTITY_ALREADY_EXISTS = 'EntityAlreadyExists'

export class BookRepository extends Repository {
    #dbName = 'bookolog.db';
    #booksStore = 'booksStore';

    constructor() {
        super();
        this.logger = getLogger({
            namespace: 'Storage',
            loggerName: 'BookRepository'
        })
    }

    async saveBook(book) {
        await super.open(this.#dbName);

        if (book.guid) {
            throw ENTITY_ALREADY_EXISTS;
        }

        const result = await this.save(this.#booksStore, book);

        this.logger.info('saved book', result);

        return result;
    }

    async saveBooks(books) {
        await super.open(this.#dbName);

        books.forEach(item => {
            if (item.guid) {
                throw ENTITY_ALREADY_EXISTS;
            }
        })

        const result = await this.saveMany(this.#booksStore, books);

        this.logger.info('saved books', result);

        return result;
    }
}
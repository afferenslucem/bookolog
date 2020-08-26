import { Repository } from "./repository";
import { getLogger } from '@/logger'

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
        const result = await this.save(this.#booksStore, book);

        this.logger.info('saved book', result);

        return result;
    }
}
import { Repository } from "./repository";
import { getLogger } from '@/logger'
import _ from 'declarray';
import { UUIDGenerator } from 'essents';
import { Book } from '@/models/book'

const ENTITY_ALREADY_EXISTS = 'EntityAlreadyExists';
const ENTITY_DOES_NOT_EXISTS = 'EntityDoesNotExists';

export class BookRepository {
    #repository = new Repository();

    #dbName = 'bookolog.db';
    #booksStore = 'booksStore';

    #generator = new UUIDGenerator();

    constructor() {
        this.logger = getLogger({
            namespace: 'Storage',
            loggerName: 'BookRepository'
        })
    }

    async saveBook(book) {
        await this.#repository.open(this.#dbName);

        if (book.guid) {
            throw ENTITY_ALREADY_EXISTS;
        } else {
            book.guid = this.#generator.generate();
        }

        await this.#repository.save(this.#booksStore, book);

        return book;
    }

    async updateBook(book) {
        await this.#repository.open(this.#dbName);

        if (!book.guid) {
            throw ENTITY_DOES_NOT_EXISTS;
        }

        await this.#repository.update(this.#booksStore, book);

        return book;
    }

    async deleteBook(guid) {
        await this.#repository.open(this.#dbName);

        await this.#repository.delete(this.#booksStore, guid);

        return;
    }

    async saveManyBooks(books) {
        await this.#repository.open(this.#dbName);

        books.forEach(item => {
            if (item.guid) {
                throw ENTITY_ALREADY_EXISTS;
            }
            else {
                item.guid = this.#generator.generate();
            }
        })

        const result = await this.#repository.saveMany(this.#booksStore, books);

        this.logger.info('saved books', result);

        return books;
    }

    async updateManyBooks(books) {
        await this.#repository.open(this.#dbName);

        books.forEach(item => {
            if (!item.guid) {
                throw ENTITY_DOES_NOT_EXISTS;
            }
        })

        const result = await this.updateMany(this.#booksStore, books);

        this.logger.info('update books', result);

        return books;
    }

    async saveOrUpdateBook(book) {
        if(book.guid) {
            return await this.updateBook(book);
        } else {
            return await this.saveBook(book);
        }
    }

    async saveOrUpdateManyBooks(books) {
        const shouldCreate = _(books).where(item => !item.guid).toArray();
        const shouldUpdate = _(books).where(item => !!item.guid).toArray();

        const created = await this.saveManyBooks(shouldCreate);
        const updated = await this.updateManyBooks(shouldUpdate);

        return _(created).concat(updated).toArray();
    }

    async allBooks() {
        await this.#repository.open(this.#dbName);
        const books = await this.#repository.all(this.#booksStore);

        return _(books).select(item => new Book(item)).toArray();
    }

    async clearBooks() {
        await this.#repository.open(this.#dbName);
        await this.#repository.clear(this.#booksStore);
    }
}
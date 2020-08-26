import { Repository } from "./repository";
import { getLogger } from '@/logger'
import _ from 'ursus-utilus-collections';
import { UUIDGenerator } from 'ursus-utilus';
import { Book } from '@/models/book'

const ENTITY_ALREADY_EXISTS = 'EntityAlreadyExists';
const ENTITY_DOES_NOT_EXISTS = 'EntityDoesNotExists';

export class BookRepository extends Repository {
    #dbName = 'bookolog.db';
    #booksStore = 'booksStore';

    #generator = new UUIDGenerator();

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
        } else {
            book.guid = this.#generator.generate();
        }

        await this.save(this.#booksStore, book);

        return book;
    }

    async updateBook(book) {
        await super.open(this.#dbName);

        if (!book.guid) {
            throw ENTITY_DOES_NOT_EXISTS;
        }

        await this.update(this.#booksStore, book);

        return book;
    }

    async deleteBook(guid) {
        await super.open(this.#dbName);

        await this.delete(this.#booksStore, guid);

        return;
    }

    async saveManyBooks(books) {
        await super.open(this.#dbName);

        books.forEach(item => {
            if (item.guid) {
                throw ENTITY_ALREADY_EXISTS;
            }
            else {
                item.guid = this.#generator.generate();
            }
        })

        const result = await this.saveMany(this.#booksStore, books);

        this.logger.info('saved books', result);

        return books;
    }

    async updateManyBooks(books) {
        await super.open(this.#dbName);

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
        await super.open(this.#dbName);

        if(book.guid) {
            return await this.updateBook(book);
        } else {
            return await this.saveBook(book);
        }
    }

    async saveOrUpdateManyBooks(books) {
        await super.open(this.#dbName);

        const shouldCreate = _(books).where(item => !item.guid).toArray();
        const shouldUpdate = _(books).where(item => !!item.guid).toArray();

        const created = await this.saveManyBooks(shouldCreate);
        const updated = await this.updateManyBooks(shouldUpdate);

        return _(created).concat(updated).toArray();
    }

    async allBooks() {
        await super.open(this.#dbName);
        const books = await this.all(this.#booksStore);

        console.log(books)

        return _(books).select(item => new Book(item)).toArray();
    }
}
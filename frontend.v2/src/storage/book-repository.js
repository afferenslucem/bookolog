import { Repository } from "./repository";
import { getLogger } from '@/logger'
import _ from 'declarray';
import { UUIDGenerator } from 'essents';
import { Book } from '@/models/book'

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
            //
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
        if(books.length === 0) return;

        await this.#repository.open(this.#dbName);

        books.forEach(item => {
            if (item.guid) {
                //
            }
            else {
                item.guid = this.#generator.generate();
            }
        })

        await this.#repository.saveMany(this.#booksStore, books);

        return books;
    }

    async deleteManyBooks(books) {
        if(books.length === 0) return;
        this.logger.debug('delete books', books);

        await this.#repository.open(this.#dbName);

        await this.#repository.deleteMany(this.#booksStore, books.map(item => item.guid));

        return books;
    }

    async updateManyBooks(books) {
        if(books.length === 0) return;

        await this.#repository.open(this.#dbName);

        books.forEach(item => {
            if (!item.guid) {
                throw ENTITY_DOES_NOT_EXISTS;
            }
        })

        await this.#repository.updateMany(this.#booksStore, books);

        return books;
    }

    async allBooks() {
        await this.#repository.open(this.#dbName);
        const books = await this.#repository.all(this.#booksStore);

        return _(books).select(item => new Book(item)).toArray();
    }

    async clearBooks() {
        this.logger.debug('clear all books');
        await this.#repository.open(this.#dbName);
        await this.#repository.clear(this.#booksStore);
    }
}
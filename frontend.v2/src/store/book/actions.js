import {getLogger} from '../../logger';
import { BOOKS_LOAD_ACTION, BOOK_ADD_ACTION, BOOK_DELETE_ACTION, BOOKS_SAVE_MUTATION,
    BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION, BOOK_UPDATE_MUTATION, BOOK_UPDATE_ACTION,
    BOOK_GET_BY_GUID_ACTION} from '../naming';
import { BookRepository } from '@/storage/book-repository';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Actions'
});

export const actions = {
    [BOOKS_LOAD_ACTION]: async ({commit}) => {
        const storage = new BookRepository();
        const books = await storage.allBooks();

        commit(BOOKS_SAVE_MUTATION, books)
    },
    [BOOK_ADD_ACTION]: async ({commit}, book) => {
        if(!book) return;

        const storage = new BookRepository();
        await storage.saveBook(book);

        commit(BOOK_ADD_MUTATION, book)

        logger.info('saved book')
    },
    [BOOK_UPDATE_ACTION]: async ({commit}, book) => {
        if(!book) return;

        const storage = new BookRepository();
        await storage.updateBook(book);
        
        commit(BOOK_UPDATE_MUTATION, book)

        logger.info('updated book')
    },
    [BOOK_GET_BY_GUID_ACTION]: async ({state}, guid) => {
        const book = state[guid];

        return book;
    },
    [BOOK_DELETE_ACTION]: async ({commit}, guid) => {
        if(!guid) return;

        const storage = new BookRepository();
        await storage.deleteBook(guid);

        commit(BOOK_DELETE_MUTATION, guid)
    },
}
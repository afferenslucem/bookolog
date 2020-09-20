import {getLogger} from '../../logger';
import { 
    BOOKS_SYNC_ACTION, 
    BOOKS_CLEAR_ACTION, 
    BOOK_ADD_ACTION, 
    BOOK_DELETE_ACTION, 
    BOOKS_SAVE_MUTATION,
    BOOK_ADD_MUTATION, 
    BOOK_DELETE_MUTATION, 
    BOOK_UPDATE_MUTATION, 
    BOOK_UPDATE_ACTION,
    BOOK_GET_BY_GUID_ACTION,
    BOOKS_CLEAR_MUTATION,
} from '../naming';
import { BookRepository } from '@/storage/book-repository';
import { BookSynchronizator } from './utils/synchronizator';
import { Book } from '@/models/book';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Actions'
});

export const actions = {
    [BOOKS_SYNC_ACTION]: async ({commit, rootState}) => {
        const synchronizer = new BookSynchronizator();

        const books = await synchronizer.sync(rootState.user.id);

        commit(BOOKS_SAVE_MUTATION, books)
    },
    [BOOK_ADD_ACTION]: async ({commit}, book) => {
        if(!book) return;

        book = new Book(book);

        book = await new BookSynchronizator().saveBook(book);

        commit(BOOK_ADD_MUTATION, book)

        logger.info('saved book')
    },
    [BOOK_UPDATE_ACTION]: async ({commit}, book) => {
        if(!book) return;

        book = await new BookSynchronizator().updateBook(book);
        
        commit(BOOK_UPDATE_MUTATION, book)

        logger.info('updated book')
    },
    [BOOK_GET_BY_GUID_ACTION]: async ({state, commit}, guid) => {
        const book = await new BookSynchronizator().loadBook(guid);

        if(book) {
            commit(BOOK_UPDATE_MUTATION, book)
        }

        return state[guid];
    },
    [BOOK_DELETE_ACTION]: async ({commit, state}, guid) => {
        if(!guid) return;

        let shouldContinue = true;

        await new BookSynchronizator().deleteBook(guid, async () => {
            const storage = new BookRepository();

            const book = state[guid];

            book.deleted = true;

            storage.updateBook(book);

            commit(BOOK_UPDATE_MUTATION, book)

            shouldContinue = false;
        });

        if(!shouldContinue) return;

        commit(BOOK_DELETE_MUTATION, guid)
    },
    [BOOKS_CLEAR_ACTION]: async ({commit}) => {
        const storage = new BookRepository();
        await storage.clearBooks();

        commit(BOOKS_CLEAR_MUTATION)
    },
}
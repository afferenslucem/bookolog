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
    NETWORK_ERROR,
} from '../naming';
import { BookRepository } from '@/storage/book-repository';
import { BookClient } from '@/http/book-client';
import moment from 'moment'
import { BookSynchronizator } from './utils/synchronizator';

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

        try {
            book = await new BookClient().create(book);
        } catch (e) {
            logger.debug(e);

            if(e == NETWORK_ERROR) {
                book.shouldSync = true;
            } else {
                logger.error('Unexpected error:', e)
                return;
            }
        }

        const storage = new BookRepository();
        await storage.saveBook(book);

        commit(BOOK_ADD_MUTATION, book)

        logger.info('saved book')
    },
    [BOOK_UPDATE_ACTION]: async ({commit}, book) => {
        if(!book) return;

        book.modifyDate = moment(new Date()).format();

        try {
            book = await new BookClient().update(book);
        } catch (e) {
            logger.debug(e);

            if(e == NETWORK_ERROR) {
                //
            } else {
                logger.error('Unexpected error:', e)
                return;
            }
        }

        const storage = new BookRepository();
        await storage.updateBook(book);
        
        commit(BOOK_UPDATE_MUTATION, book)

        logger.info('updated book')
    },
    [BOOK_GET_BY_GUID_ACTION]: async ({state}, guid) => {
        const book = state[guid];

        return book;
    },
    [BOOK_DELETE_ACTION]: async ({commit, state}, guid) => {
        if(!guid) return;

        try {
            await new BookClient().delete(guid);
        } catch (e) {
            logger.debug(e);

            if(e == NETWORK_ERROR) {
                const storage = new BookRepository();

                const book = state[guid];

                book.deleted = true;

                await storage.updateBook(book);

                commit(BOOK_UPDATE_MUTATION, book)

                return;
            } else {
                logger.error('Unexpected error:', e)
                return;
            }
        }

        const storage = new BookRepository();
        await storage.deleteBook(guid);

        commit(BOOK_DELETE_MUTATION, guid)
    },
    [BOOKS_CLEAR_ACTION]: async ({commit}) => {
        const storage = new BookRepository();
        await storage.clear();

        commit(BOOKS_CLEAR_MUTATION)
    },
}
import {getLogger} from '../../logger';
import u from 'ursus-utilus-collections'
import { BOOKS_LOAD_ACTION, BOOK_ADD_ACTION, BOOKS_SAVE_MUTATION,
    BOOK_ADD_MUTATION, BOOK_UPDATE_MUTATION, BOOK_UPDATE_ACTION,
    BOOK_GET_BY_ID_ACTION} from '../naming';
import {BookClient} from '@/http/book-client';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Actions'
});

export const actions = {
    [BOOKS_LOAD_ACTION]: async ({commit}) => {
        logger.debug('Load books')

        const books = await new BookClient().get();

        logger.debug('Received books', books)

        commit(BOOKS_SAVE_MUTATION, books)

        logger.info('loaded books')
    },
    [BOOK_ADD_ACTION]: async ({commit}, book) => {
        if(!book) return;

        commit(BOOK_ADD_MUTATION, book)

        logger.info('saved book')
    },
    [BOOK_UPDATE_ACTION]: async ({commit}, id, book) => {
        if(!book) return;

        commit(BOOK_UPDATE_MUTATION, id, book)

        logger.info('updated book')
    },
    [BOOK_GET_BY_ID_ACTION]: async ({state}, guid) => {
        const book = u(state.books).first(item => item.guid === guid);

        return book;
    },
}
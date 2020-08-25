import {getLogger} from '../../logger';
import { BOOKS_LOAD_ACTION, BOOK_ADD_ACTION, BOOKS_SAVE_MUTATION, BOOK_ADD_MUTATION } from '../naming';
import {BookClient} from '@/http/book-client';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Actions'
});

export const actions = {
    [BOOKS_LOAD_ACTION]: async ({commit}) => {
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
}
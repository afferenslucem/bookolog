import {getLogger} from '../../logger';
import { BOOKS_LOAD_ACTION, BOOKS_SAVE_MUTATION } from '../naming';
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
    }
}
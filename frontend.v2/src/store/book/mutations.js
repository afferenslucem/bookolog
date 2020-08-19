import {getLogger} from '../../logger';
import { BOOKS_SAVE_MUTATION } from '../naming';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [BOOKS_SAVE_MUTATION]: (state, books) => {
        state.books = books
        logger.debug('Saved books', books);
        logger.debug('State', state);
    }
}
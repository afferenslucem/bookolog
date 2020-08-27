import {getLogger} from '../../logger';
import { BOOKS_SAVE_MUTATION, BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION, BOOK_UPDATE_MUTATION } from '../naming';
import Vue from 'vue'

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [BOOKS_SAVE_MUTATION]: (state, books) => {
        books.forEach(book => {
            Vue.set(state, book.guid, book);
        });
    },
    [BOOK_ADD_MUTATION]: (state, book) => {
        Vue.set(state, book.guid, book);
    },
    [BOOK_UPDATE_MUTATION]: (state, book) => {
        Vue.set(state, book.guid, book);

        logger.debug('Updated book', book);
        logger.debug('State', state);
    },
    [BOOK_DELETE_MUTATION]: (state, guid) => {
        Vue.delete(state, guid);
    }
}
import {getLogger} from '../../logger';
import { BOOKS_SAVE_MUTATION, BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION, BOOK_UPDATE_MUTATION } from '../naming';
import Vue from 'vue';
import u from 'ursus-utilus-collections';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [BOOKS_SAVE_MUTATION]: (state, books) => {
        state.books = books;
    },
    [BOOK_ADD_MUTATION]: (state, book) => {
        Vue.set(state.books, [(state.books || []).length], book);
    },
    [BOOK_UPDATE_MUTATION]: (state, book) => {
        let id = 0;

        for(let i = 0; i < state.books.length; i++) {
            if(state.books[i].guid == book.guid) {
                id = i;
                return;
            }
        }

        Vue.set(state.books, [id], book);
        logger.debug('Updated book', book);
        logger.debug('State', state);
    },
    [BOOK_DELETE_MUTATION]: (state, guid) => {
        state.books = u(state.books).where(item => item.guid !== guid).toArray();
    }
}
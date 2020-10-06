import { BOOKS_SAVE_MUTATION, BOOKS_CLEAR_MUTATION, BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION, BOOK_UPDATE_MUTATION } from '../naming';
import Vue from 'vue'


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
        Vue.delete(state, book.guid);
        Vue.set(state, book.guid, book);
    },
    [BOOK_DELETE_MUTATION]: (state, guid) => {
        Vue.delete(state, guid);
    },
    [BOOKS_CLEAR_MUTATION]: (state) => {
        Object.keys(state).forEach(guid => {
            Vue.delete(state, guid);
        })
    }
}
import { BooksModule, Book, Status } from '@/types/books-module'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { StoreType } from '@/store'
import { HttpClient } from '@/utils/http-client'
import Vue from 'vue';
import _ from 'underscore';

export enum BookMutations {
    pushBooks = 'BOOKS_pushBooks',
    updateBook = 'BOOKS_updateBook',
    deleteBook = 'BOOKS_deleteBook',
}
export enum BookActions {
    createBook = 'BOOKS_createBook',
    loadBooks = 'BOOKS_loadBooks',
    updateBook = 'BOOKS_updateBook',
    deleteBook = 'BOOKS_deleteBook',
}

export const getters: GetterTree<BooksModule, StoreType> = {
    toReadBooks(state: BooksModule): Book[] {
        return state.books.filter(book => book.status == Status.toRead)
    },
    inProgressBooks(state: BooksModule): Book[] {
        return state.books.filter(book => book.status == Status.inProgress)
    },
    doneBooks(state: BooksModule): Book[] {
        return state.books.filter(book => book.status == Status.done)
    },
}

export const mutations: MutationTree<BooksModule> = {
    [BookMutations.pushBooks](state: BooksModule, books: Book[]) {
        Vue.set(state, 'books', books);
    },
}

export const actions: ActionTree<BooksModule, StoreType> = {
    async [BookActions.updateBook]({commit, dispatch}, book: Book): Promise<void> {
        book.authors = book.authors.filter(item => item.trim() != '');

        await new HttpClient().updateBook(book);

        await dispatch(BookActions.loadBooks);
    },
    async [BookActions.createBook]({commit, dispatch}, book: Book): Promise<void> {
        book.authors = book.authors.filter(item => item.trim() != '');

        await new HttpClient().createBook(book);

        await dispatch(BookActions.loadBooks);
    },
    async [BookActions.deleteBook]({commit, dispatch}, book: Book): Promise<void> {
        const result = await new HttpClient().deleteBook(book);

        await dispatch(BookActions.loadBooks);
    },
    async [BookActions.loadBooks]({commit}): Promise<void> {
        const booksAnswer = await new HttpClient().getBooks();

        if(booksAnswer.Data) {
            const books = booksAnswer.Data.map(item => new Book(item));

            commit(BookMutations.pushBooks, books);
        }
    }
}

export const state: BooksModule = {
    books: []
}
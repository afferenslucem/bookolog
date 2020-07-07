import { BooksModule, Book, Status } from '@/types/books-module'
import { MutationTree, GetterTree } from 'vuex'
import { StoreType } from '@/store'

export enum BookMutations {
    pushBooks = 'BOOKS_pushBooks'
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
        state.books = books;
    }
}

export const state: BooksModule = {
    books: []
}
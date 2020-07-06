import { BooksModule, Book, Status } from '@/types/books-module'

export enum BookMutations {
    pushBooks = 'BOOKS_pushBooks'
}

export const getters = {
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

export const mutations = {
    [BookMutations.pushBooks](state: BooksModule, books: Book[]) {
        state.books = books;
    }
}

export const state: BooksModule = {
    books: []
}
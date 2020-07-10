import { BooksModule, Book, Status } from '@/types/books-module'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { StoreType } from '@/store'
import { HttpClient } from '@/utils/http-client'

export enum BookMutations {
    pushBooks = 'BOOKS_pushBooks',
    updateBook = 'BOOKS_updateBook',
    deleteBook = 'BOOKS_deleteBook',
}
export enum BookActions {
    updateBook = 'BOOKS_updateBook',
    deleteBook = 'BOOKS_deleteBook',
    loadBooks = 'BOOKS_loadBooks',
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
    },
    [BookMutations.updateBook](state: BooksModule, book: Book) {
        const index = state.books.findIndex(item => item.id == book.id);

        state.books[index] = book;
    },
    [BookMutations.deleteBook](state: BooksModule, book: Book) {
        state.books = state.books.filter(item => item.id != book.id);
    }
}

export const actions: ActionTree<BooksModule, StoreType> = {
    async [BookActions.updateBook]({commit}, book: Book): Promise<void> {
        book.authors = book.authors.filter(item => item.trim() != '');

        const result = await new HttpClient().updateBook(book);

        const updated = new Book(result.Data);

        commit(BookMutations.updateBook, updated);
    },
    async [BookActions.deleteBook]({commit}, book: Book): Promise<void> {
        const result = await new HttpClient().deleteBook(book);

        commit(BookMutations.deleteBook, book);
    },
    async [BookActions.loadBooks]({commit}): Promise<void> {
        const booksAnswer = await new HttpClient().getBooks();

        if(booksAnswer.IsSuccess) {
            const books = booksAnswer.Data.map(item => new Book(item));

            commit(BookMutations.pushBooks, books);
        }
    }
}

export const state: BooksModule = {
    books: []
}
import { StoreOptions } from 'vuex';
import { BooksModule, Book, Status } from '@/types/books-module';

const booksModule = {  
    state: {
        books: []
    },
    mutations: {
        pushBooks(state, books: Book[]) {
            state.books = books;
        }
    },
    getters: {
        toReadBooks(state): Book[] {
            return state.books.filter(book => book.status == Status.toRead)
        },
        inProgressBooks(state): Book[] {
            return state.books.filter(book => book.status == Status.inProgress)
        },
        doneBooks(state): Book[] {
            return state.books.filter(book => book.status == Status.done)
        },
    }
} as StoreOptions<BooksModule>;

export default booksModule;
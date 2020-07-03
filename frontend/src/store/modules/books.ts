import { StoreOptions } from 'vuex';
import { BooksModule, Book, Status } from '@/types/books-module';

const booksModule = {  
    state: {
        books: []
    },
    mutations: {
        pushBooks(state, books: Book[]) {
            state.books = books;

            console.log(books);
        }
    },
    getters: {
        toRead(state): Book[] {
            return state.books.filter(book => book.status == Status.toRead)
        },
        inProgress(state): Book[] {
            return state.books.filter(book => book.status == Status.inProgress)
        },
        done(state): Book[] {
            return state.books.filter(book => book.status == Status.done)
        },
    }
} as StoreOptions<BooksModule>;

export default booksModule;
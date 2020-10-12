import {
    BOOKS_SYNC_ACTION,
    BOOKS_CLEAR_ACTION,
    BOOK_ADD_ACTION,
    BOOK_DELETE_ACTION,
    BOOKS_SAVE_MUTATION,
    BOOKS_LOAD_ACTION,
    BOOK_ADD_MUTATION,
    BOOK_DELETE_MUTATION,
    BOOKS_LOAD_LOCAL_ACTION,
    BOOK_UPDATE_MUTATION,
    BOOK_UPDATE_ACTION,
    BOOK_GET_AND_REFRESH_BY_GUID_ACTION,
    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
    BOOKS_CLEAR_MUTATION,
} from '../naming';
import {
    BookRepository
} from '@/storage/book-repository';
import {
    BookSynchronizator
} from './utils/synchronizator';
import {
    Book
} from '@/models/book';
import {
    NETWORK_ERROR
} from "@/http/client";

export const actions = {
    [BOOKS_SYNC_ACTION]: async ({
        commit,
        dispatch
    }) => {
        try {
            const books = await dispatch('getSyncedBooks');

            commit(BOOKS_SAVE_MUTATION, books)
        } catch (e) {
            if (e == NETWORK_ERROR) {
                const books = await dispatch('getLocalBooks');

                commit(BOOKS_SAVE_MUTATION, books)
            }

            throw e;
        }
    },

    [BOOKS_LOAD_ACTION]: async ({
        commit,
        rootState,
        dispatch
    }) => {
        const books = await dispatch('loadAllRemoteBooks', rootState.user.id);

        await dispatch('clearLocalBooks');
        await dispatch('saveManyBooks', books);

        commit(BOOKS_SAVE_MUTATION, books)
    },

    [BOOKS_LOAD_LOCAL_ACTION]: async ({
        commit,
        dispatch
    }) => {
        const books = await dispatch('loadAllLocalBooks');
        commit(BOOKS_SAVE_MUTATION, books)
    },

    [BOOK_ADD_ACTION]: async ({
        commit,
        dispatch,
    }, book) => {
        if (!book) return;

        book = new Book(book);

        try {
            book = await dispatch('saveBook', book);
        } finally {
            commit(BOOK_ADD_MUTATION, book);
        }
    },

    [BOOK_UPDATE_ACTION]: async ({
        commit,
        dispatch,
    }, book) => {
        if (!book) return;

        try {
            book = await dispatch('updateBook', book);
        } finally {
            commit(BOOK_UPDATE_MUTATION, book)
        }
    },

    [BOOK_GET_AND_REFRESH_BY_GUID_ACTION]: async ({
        state,
        commit,
        dispatch,
    }, guid) => {
        const book = await dispatch('loadBook', guid);

        commit(BOOK_UPDATE_MUTATION, book)

        return state[guid];
    },

    [BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION]: async ({
        state,
        dispatch,
    }, guid) => {
        const currentState = state[guid];
        try {
            if (currentState.shouldSync) {
                await dispatch(BOOKS_SYNC_ACTION);
            }

            return await dispatch(BOOK_GET_AND_REFRESH_BY_GUID_ACTION, guid);
        } catch (e) {
            if (e == NETWORK_ERROR) {
                return currentState;
            } else {
                throw e;
            }
        }
    },

    [BOOK_DELETE_ACTION]: async ({
        commit,
        state,
        dispatch,
    }, guid) => {
        if (!guid) return;

        try {
            await dispatch('deleteBook', guid);
            commit(BOOK_DELETE_MUTATION, guid)
        } catch (e) {
            if (e == NETWORK_ERROR) {
                const book = state[guid];

                book.deleted = true;

                await dispatch('updateLocalBook', book);

                commit(BOOK_UPDATE_MUTATION, book)
            }

            throw e;
        }
    },

    [BOOKS_CLEAR_ACTION]: async ({
        commit,
        dispatch
    }) => {
        await dispatch('clearLocalBooks');

        commit(BOOKS_CLEAR_MUTATION)
    },

    async deleteBook(context, guid) {
        return await new BookSynchronizator().deleteBook(guid);
    },

    async updateBook(context, book) {
        return await new BookSynchronizator().updateBook(book);
    },

    async updateLocalBook(context, book) {
        const storage = new BookRepository();
        await storage.updateBook(book);
    },

    async saveBook(context, book) {
        return await new BookSynchronizator().saveBook(book);
    },

    async loadAllRemoteBooks(context, id) {
        const synchronizer = new BookSynchronizator();
        return await synchronizer.loadAllRemoteBooks(id);
    },

    async loadAllLocalBooks() {
        const repository = new BookRepository();
        return await repository.allBooks();
    },

    async loadBook(context, guid) {
        console.log('load book', guid);
        return await new BookSynchronizator().loadBook(guid);
    },

    async clearLocalBooks() {
        const storage = new BookRepository();
        return await storage.clearBooks();
    },

    async saveManyBooks(context, books) {
        const storage = new BookRepository();
        return await storage.saveManyBooks(books);
    },

    async getSyncedBooks() {
        const synchronizer = new BookSynchronizator();

        return await synchronizer.sync();
    },

    async getLocalBooks() {
        return await new BookRepository().allBooks()
    },
}
import {getLogger} from '../../logger';
import { 
    BOOKS_SYNC_ACTION, 
    BOOKS_CLEAR_ACTION, 
    BOOK_ADD_ACTION, 
    BOOK_DELETE_ACTION, 
    BOOKS_SAVE_MUTATION,
    BOOK_ADD_MUTATION, 
    BOOK_DELETE_MUTATION, 
    BOOK_UPDATE_MUTATION, 
    BOOK_UPDATE_ACTION,
    BOOK_GET_BY_GUID_ACTION,
    BOOKS_CLEAR_MUTATION,
    CONNECTION_ONLINE_ACTION,
    CONNECTION_OFFLINE_ACTION,
} from '../naming';
import { BookRepository } from '@/storage/book-repository';
import { BookSynchronizator } from './utils/synchronizator';

const logger = getLogger({
    namespace: 'BooksModule',
    loggerName: 'Actions'
});

async function onOffline(dispatch) {
    await dispatch(CONNECTION_OFFLINE_ACTION)
}

async function onOnline(dispatch) {
    await dispatch(CONNECTION_ONLINE_ACTION)
}

export const actions = {
    [BOOKS_SYNC_ACTION]: async ({commit, rootState, dispatch}) => {
        const synchronizer = new BookSynchronizator();

        const books = await synchronizer.sync(rootState.user.id,
            async () => await onOffline(dispatch),
            async () => await onOnline(dispatch));

        commit(BOOKS_SAVE_MUTATION, books)
    },
    [BOOK_ADD_ACTION]: async ({commit, dispatch}, book) => {
        if(!book) return;

        book = new BookSynchronizator().saveBook(book,
            async () => await onOffline(dispatch),
            async () => await onOnline(dispatch));

        commit(BOOK_ADD_MUTATION, book)

        logger.info('saved book')
    },
    [BOOK_UPDATE_ACTION]: async ({commit, dispatch}, book) => {
        if(!book) return;

        book = await new BookSynchronizator().updateBook(book,
            async () => await onOffline(dispatch),
            async () => await onOnline(dispatch));
        
        commit(BOOK_UPDATE_MUTATION, book)

        logger.info('updated book')
    },
    [BOOK_GET_BY_GUID_ACTION]: async ({state, commit, dispatch}, guid) => {
        const book = new BookSynchronizator().loadBook(guid,
            async () => await onOffline(dispatch),
            async () => await onOnline(dispatch));

        if(book) {
            commit(BOOK_UPDATE_MUTATION, book)
        }

        return state[guid];
    },
    [BOOK_DELETE_ACTION]: async ({commit, state, dispatch}, guid) => {
        if(!guid) return;

        let shouldContinue = true;

        await new BookSynchronizator().deleteBook(guid, async () => {
            const storage = new BookRepository();

            const book = state[guid];

            book.deleted = true;

            storage.updateBook(book);

            commit(BOOK_UPDATE_MUTATION, book)

            shouldContinue = false;

            await onOffline(dispatch)
        }, async () => await onOnline(dispatch));

        if(!shouldContinue) return;

        commit(BOOK_DELETE_MUTATION, guid)
    },
    [BOOKS_CLEAR_ACTION]: async ({commit}) => {
        const storage = new BookRepository();
        await storage.clear();

        commit(BOOKS_CLEAR_MUTATION)
    },
}
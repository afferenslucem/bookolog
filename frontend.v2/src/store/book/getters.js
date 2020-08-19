import {BOOKS_IN_PROGRESS_GETTER, BOOKS_TO_READ_GETTER, BOOKS_DONE_GETTER} from '../naming';
import _ from 'ursus-utilus-collections';
import {IN_PROGRESS_STATUS, TO_READ_STATUS, DONE_STATUS} from '@/models/book';

export const getters = {
    [BOOKS_IN_PROGRESS_GETTER]: state => _(state.books).where(item => item.status === IN_PROGRESS_STATUS).toArray(),
    [BOOKS_TO_READ_GETTER]: state => _(state.books).where(item => item.status === TO_READ_STATUS).toArray(),
    [BOOKS_DONE_GETTER]: state => _(state.books).where(item => item.status === DONE_STATUS).toArray(),
}
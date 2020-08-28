import {BOOKS_IN_PROGRESS_GETTER, BOOKS_TO_READ_GETTER, BOOKS_DONE_GETTER, BOOKS_GENRES_COUNT_GETTER} from '../naming';
import _ from 'declarray';
import {IN_PROGRESS_STATUS, TO_READ_STATUS, DONE_STATUS} from '@/models/book';
export const getters = {
    books: state => Object.values(state),
    [BOOKS_IN_PROGRESS_GETTER]: (state, getters) => _(getters.books).where(item => item.status === IN_PROGRESS_STATUS).toArray(),
    [BOOKS_TO_READ_GETTER]: (state, getters) => _(getters.books).where(item => item.status === TO_READ_STATUS).toArray(),
    [BOOKS_DONE_GETTER]: (state, getters) => _(getters.books).where(item => item.status === DONE_STATUS).toArray(),
    [BOOKS_GENRES_COUNT_GETTER]: (state, getters) => _(getters[BOOKS_DONE_GETTER])
        .where(item => !!item.genre)
        .where(item => item.status)
        .groupBy(item => item.genre.toLowerCase(), group => group.count())
        .sortBy(item => item.group, (a, b) => b - a)
        .select(item => ({ name: item.key, count: item.group}))
        .toArray(),
}
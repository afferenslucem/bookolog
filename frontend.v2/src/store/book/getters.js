import {
    BOOKS_IN_PROGRESS_GETTER,
    BOOKS_TO_READ_GETTER,
    BOOKS_DONE_GETTER,
    BOOKS_GENRES_COUNT_GETTER,
    BOOKS_TAGS_COUNT_GETTER,
    BOOKS_AUTHORS_COUNT_GETTER
} from '../naming';
import _ from 'declarray';
import {
    IN_PROGRESS_STATUS,
    TO_READ_STATUS,
    DONE_STATUS
} from '@/models/book';

export const getters = {
    books: state => Object.values(state),
    [BOOKS_IN_PROGRESS_GETTER]: (state, getters) => _(getters.books).where(item => item.status === IN_PROGRESS_STATUS).toArray(),
    [BOOKS_TO_READ_GETTER]: (state, getters) => _(getters.books).where(item => item.status === TO_READ_STATUS).toArray(),
    [BOOKS_DONE_GETTER]: (state, getters) => _(getters.books).where(item => item.status === DONE_STATUS).toArray(),
    [BOOKS_GENRES_COUNT_GETTER]: (state, getters) => _(getters[BOOKS_DONE_GETTER])
        .where(item => !!item.genre)
        .groupBy(item => item.genre.toLowerCase(), group => group.count())
        .orderByDescending(item => item.group)
        .select(item => ({
            name: item.key,
            count: item.group
        }))
        .toArray(),
    [BOOKS_TAGS_COUNT_GETTER](state, getters) {
        const tags = _(getters[BOOKS_DONE_GETTER])
            .where(item => !!item.tags && item.tags.length > 0)
            .select(item => item.tags)
            .aggregate((a, b) => a.concat(b), []);

        const result = _(tags).groupBy(item => item, group => group.count())
            .orderByDescending(item => item.group)
            .select(item => ({
                name: item.key,
                count: item.group
            }))
            .toArray();

        return result;
    },
    [BOOKS_AUTHORS_COUNT_GETTER](state, getters) {
        const authors = _(getters[BOOKS_DONE_GETTER])
            .where(item => !!item.authors && item.authors.length > 0)
            .select(item => item.authors)
            .aggregate((a, b) => a.concat(b), []);

        const result = _(authors).groupBy(item => item, group => group.count())
            .orderByDescending(item => item.group)
            .select(item => ({
                name: item.key,
                count: item.group
            }))
            .toArray();

        return result;
    }
}
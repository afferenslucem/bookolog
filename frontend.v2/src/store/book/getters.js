import {
    BOOKS_IN_PROGRESS_GETTER,
    BOOKS_TO_READ_GETTER,
    BOOKS_DONE_GETTER,
    BOOKS_DONE_GENRES_COUNT_GETTER,
    BOOKS_DONE_TAGS_COUNT_GETTER,
    BOOKS_DONE_AUTHORS_COUNT_GETTER,
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
import {
    stringComparer
} from '@/utils/string-comparing';

function groupByGenres(books) {
    return _(books)
        .where(item => !!item.genre)
        .groupBy(item => item.genre.toLowerCase(), stringComparer, group => group.count())
        .orderByDescending(item => item.group)
        .select(item => ({
            name: item.key,
            count: item.group
        }))
        .toArray();
}

function groupByTags(books) {
    const tags = _(books)
        .where(item => !!item.tags && item.tags.length > 0)
        .select(item => item.tags)
        .aggregate((a, b) => a.concat(b), []);

    const result = _(tags).groupBy(item => item, stringComparer, group => group.count())
        .orderByDescending(item => item.group)
        .select(item => ({
            name: item.key,
            count: item.group
        }))
        .toArray();

    return result;
}

function groupByAuthors(books) {
    const authors = _(books)
        .where(item => !!item.authors && item.authors.length > 0)
        .select(item => item.authors)
        .aggregate((a, b) => a.concat(b), []);

    const result = _(authors).groupBy(item => item, stringComparer, group => group.count())
        .orderByDescending(item => item.group)
        .select(item => ({
            name: item.key,
            count: item.group
        }))
        .toArray();

    return result;
}



export const getters = {
    books: state => _(Object.values(state)).where(item => item.deleted == false || item.deleted == undefined).toArray(),
    [BOOKS_IN_PROGRESS_GETTER]: (state, getters) => _(getters.books).where(item => item.status === IN_PROGRESS_STATUS).toArray(),
    [BOOKS_TO_READ_GETTER]: (state, getters) => _(getters.books).where(item => item.status === TO_READ_STATUS).toArray(),
    [BOOKS_DONE_GETTER]: (state, getters) => _(getters.books).where(item => item.status === DONE_STATUS).toArray(),
    [BOOKS_DONE_GENRES_COUNT_GETTER]: (state, getters) => groupByGenres(getters[BOOKS_DONE_GETTER]),
    [BOOKS_DONE_TAGS_COUNT_GETTER]: (state, getters) => groupByTags(getters[BOOKS_DONE_GETTER]),
    [BOOKS_DONE_AUTHORS_COUNT_GETTER]: (state, getters) => groupByAuthors(getters[BOOKS_DONE_GETTER]),
    [BOOKS_GENRES_COUNT_GETTER]: (state, getters) => groupByGenres(getters.books),
    [BOOKS_TAGS_COUNT_GETTER]: (state, getters) => groupByTags(getters.books),
    [BOOKS_AUTHORS_COUNT_GETTER]: (state, getters) => groupByAuthors(getters.books),
}
import { getters } from '@/store/book/getters'
import { BOOKS_IN_PROGRESS_GETTER, BOOKS_DONE_GETTER, BOOKS_TO_READ_GETTER } from '@/store/naming'
import {TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS} from '@/models/book'
import books from '../../data/books'
import _ from 'declarray'
import { assert } from 'chai';

describe('Book Getters', () => {
    it('should return books with in progress status', () => {
        const state = {};
        const result = getters[BOOKS_IN_PROGRESS_GETTER](state, {
            books
        });

        const expected = IN_PROGRESS_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
    it('should return books with done status', () => {
        const state = {};
        const result = getters[BOOKS_DONE_GETTER](state, {
            books
        });

        const expected = DONE_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
    it('should return books with to read status', () => {
        const state = {};
        const result = getters[BOOKS_TO_READ_GETTER](state, {
            books
        });

        const expected = TO_READ_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
    it('should return books like array', () => {
        const state = {
            [books[0].guid]: books[0]
        };
        const result = getters.books(state);

        const expected = [books[0]];

        assert.deepEqual(result, expected)
    })
})

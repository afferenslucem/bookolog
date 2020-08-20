import { getters } from '@/store/book/getters'
import { BOOKS_IN_PROGRESS_GETTER, BOOKS_DONE_GETTER, BOOKS_TO_READ_GETTER } from '@/store/naming'
import {TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS} from '@/models/book'
import books from '../../data/books'
import _ from 'ursus-utilus-collections'
import { assert } from 'chai';

describe('Book Getters', () => {
    it('should return books with in progress status', () => {
        const state = {
            books
        };

        const result = getters[BOOKS_IN_PROGRESS_GETTER](state);

        const expected = IN_PROGRESS_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
    it('should return books with done status', () => {
        const state = {
            books
        };

        const result = getters[BOOKS_DONE_GETTER](state);

        const expected = DONE_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
    it('should return books with to read status', () => {
        const state = {
            books
        };

        const result = getters[BOOKS_TO_READ_GETTER](state);

        const expected = TO_READ_STATUS;

        for(let item of result) {
            assert.equal(item.status, expected)
        }

        const len = _(result).count();
        const booksTargetLen = _(books).count(item => item.status == expected);

        assert.equal(len, booksTargetLen)
    })
})

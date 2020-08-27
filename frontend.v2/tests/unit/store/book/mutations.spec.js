import { mutations } from '@/store/book/mutations'
import { BOOKS_SAVE_MUTATION, BOOKS_CLEAR_MUTATION, BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION } from '@/store/naming'
import books from '../../data/books'
import u from 'ursus-utilus-collections'
import { assert } from 'chai';

function getState(books) {
    const state = {

    };

    for (let item of books) {
        state[item.guid] = item
    }

    return state;
}

describe('Book Mutations', () => {
    it('should save books', () => {
        const state = {
        };

        mutations[BOOKS_SAVE_MUTATION](state, books);

        const expected = getState(books);

        assert.deepEqual(state, expected)
    })
    it('should add books', () => {
        const state = {
        };

        mutations[BOOK_ADD_MUTATION](state, books[0]);

        const expected = {
            [books[0].guid] : books[0]
        };

        assert.deepEqual(state, expected)
    })
    it('should delete books', () => {
        const state = getState(books)
        
        mutations[BOOK_DELETE_MUTATION](state, books[0].guid);

        const expected = u(books).skip(1).sortBy(item => item.guid).toArray();

        const actual = u(Object.values(state)).sortBy(item => item.guid).toArray();

        assert.deepEqual(actual, expected)
    })
    it('should clear books', () => {
        const state = getState(books)
        
        mutations[BOOKS_CLEAR_MUTATION](state);

        assert.deepEqual(state, {})
    })
})

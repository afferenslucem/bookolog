import { mutations } from '@/store/book/mutations'
import { BOOKS_SAVE_MUTATION, BOOK_ADD_MUTATION, BOOK_DELETE_MUTATION } from '@/store/naming'
import books from '../../data/books'
import u from 'ursus-utilus-collections'
import { assert } from 'chai';

describe('Book Mutations', () => {
    it('should save books', () => {
        const state = {
        };

        mutations[BOOKS_SAVE_MUTATION](state, books);

        const expected = {

        };

        for (let item of books) {
            expected[item.guid] = item
        }

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
        const state = {
        };

        for(let item of books){
            state[item.guid] = item;
        }
        
        mutations[BOOK_DELETE_MUTATION](state, books[0].guid);

        const expected = u(books).skip(1).sortBy(item => item.guid).toArray();

        const actual = u(Object.values(state)).sortBy(item => item.guid).toArray();

        assert.deepEqual(actual, expected)
    })
})

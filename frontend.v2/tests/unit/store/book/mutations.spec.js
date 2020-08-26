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

        const expected = books;

        assert.deepEqual(state.books, expected)
    })
    it('should add books', () => {
        const state = {
            books: []
        };

        mutations[BOOK_ADD_MUTATION](state, books[0]);

        const expected = books[0];

        assert.deepEqual(state.books[0], expected)
    })
    it('should delete books', () => {
        const state = {
            books
        };
        
        mutations[BOOK_DELETE_MUTATION](state, books[0].guid);

        const expected = u(books).skip(1).toArray();

        assert.deepEqual(state.books, expected)
    })
})

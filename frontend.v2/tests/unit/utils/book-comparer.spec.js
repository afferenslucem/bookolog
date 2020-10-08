import {
    assert
} from 'chai';

import {
    stringComparer
} from '@/utils/string-comparing';

describe('Book Comparer', () => {
    describe('Equality check', () => {
        it('should return true for different cases', () => {
            const first = 'abc';
            const second = 'ABC'

            assert.isTrue(stringComparer.equal(first, second));
        })

        it('should return true for same string', () => {
            const first = 'abc';
            const second = 'abc'

            assert.isTrue(stringComparer.equal(first, second));
        })

        it('should return true for same string with whitespaces', () => {
            const first = '  abc';
            const second = 'abc     '

            assert.isTrue(stringComparer.equal(first, second));
        })
    });
});
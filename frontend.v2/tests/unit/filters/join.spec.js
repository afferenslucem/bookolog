import join from '@/filters/join'
import { assert } from 'chai';

describe('Join Filter', () => {
    it('should return joined by comma and space', () => {
        const items = ['a', 'b', 'c'];

        const result = join(items);

        const expected = 'a, b, c';

        assert.equal(result, expected);
    })

    it('should return joined by "|"', () => {
        const items = ['a', 'b', 'c'];

        const result = join(items, '|');

        const expected = 'a|b|c';

        assert.equal(result, expected);
    })
});

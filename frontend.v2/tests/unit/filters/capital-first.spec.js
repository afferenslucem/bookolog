import capital from '@/filters/capital-first'
import { assert } from 'chai';

describe('Capital Filter', () => {
    it('should return capitalized', () => {
        const input = 'abc';

        const result = capital(input);

        const expected = 'Abc';

        assert.equal(result, expected);
    })

    it('should keep string', () => {
        const input = 'Abc';

        const result = capital(input);

        const expected = 'Abc';

        assert.equal(result, expected);
    })

    it('should keep string', () => {
        const input = 'ABC';

        const result = capital(input);

        const expected = 'ABC';

        assert.equal(result, expected);
    })
});

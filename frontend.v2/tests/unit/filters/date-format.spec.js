import dateFormat from '@/filters/format-date'
import { assert } from 'chai';

describe('Date Format Filter', () => {
    it('should return formatted', () => {
        const input = '1997-01-14';

        const result = dateFormat(input);

        const expected = '01/14/1997';

        assert.equal(result, expected);
    })

    it('should return formatted', () => {
        const input = new Date('1997-01-14');

        const result = dateFormat(input);

        const expected = '01/14/1997';

        assert.equal(result, expected);
    })

    it('should return formatted', () => {
        const input = new Date('qwerty');

        const result = dateFormat(input);

        const expected = '';

        assert.equal(result, expected);
    })

    it('should return formatted', () => {
        const input = 'qwerty';

        const result = dateFormat(input);

        const expected = '';

        assert.equal(result, expected);
    })

    it('should return empty', () => {
        const input = '';

        const result = dateFormat(input);

        const expected = '';

        assert.equal(result, expected);
    })

    it('should return empty 2', () => {
        const input = null;

        const result = dateFormat(input);

        const expected = '';

        assert.equal(result, expected);
    })
    
    it('should return default', () => {
        const input = null;

        const result = dateFormat(input, 'default');

        const expected = 'default';

        assert.equal(result, expected);
    })
});

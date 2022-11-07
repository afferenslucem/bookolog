import { Capitalizer } from "./capitalizer";

describe('Capitalize', () => {
    test('capitalizes one value', () => {
        const result = new Capitalizer().capitalize('hello')

        expect(result).toBe('Hello')
    })

    test('capitalizes two values', () => {
        const result = new Capitalizer().capitalize(['hello', 'world'])

        expect(result).toEqual(['Hello', 'World'])
    })
})

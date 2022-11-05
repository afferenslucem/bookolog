import { render } from "@testing-library/react";
import React from "react";
import Join from "./Join";

describe('BookAuthors', () => {
    test('renders one author', () => {
        const el = render(<Join value={['Джордж Мартин']}/>);

        const content = el.asFragment();

        expect(content.textContent).toBe('Джордж Мартин')
    })

    test('renders two author', () => {
        const el = render(<Join value={['Андрей Круз', 'Андрей Царев']}/>);

        const content = el.asFragment();

        expect(content.textContent).toBe('Андрей Круз, Андрей Царев')
    })

    test('renders no one author', () => {
        const el = render(<Join value={[]}/>);

        const content = el.asFragment();

        expect(content.textContent).toBe('Unknown author')
    })

    test('joins by |', () => {
        const el = render(<Join value={['first', 'second', 'third']} separator=" | "/>);

        const content = el.asFragment();

        expect(content.textContent).toBe('first | second | third')
    })

    test('passes className', () => {
        const el = render(<Join value={['first', 'second', 'third']} className="test-class"/>);

        const content = el.asFragment().querySelector('span');

        expect(content).toHaveClass("test-class");
    })
})

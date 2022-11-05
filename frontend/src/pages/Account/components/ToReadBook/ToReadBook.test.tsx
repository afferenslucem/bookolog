import { render } from "@testing-library/react";
import React from "react";
import { Book } from "../../../../common/models/book/book";
import ToReadBook from "./ToReadBook";

describe('ToReadBook', () => {
    test('renders header',  () => {
        const value = new Book({
            name: 'Кровь дракона'
        } as any);

        const el = render(<ToReadBook book={value}/>);

        const content = el.asFragment().querySelector('.book__header')!;

        expect(content.textContent).toBe('Кровь дракона')
    })

    describe('Authors', () => {
        test('renders one author',  () => {
            const value = new Book({
                authors: ['Джордж Мартин']
            } as any);

            const el = render(<ToReadBook book={value}/>);

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Джордж Мартин')
        })

        test('renders two authors',  () => {
            const value = new Book({
                authors: ['Андрей Круз', 'Андрей Царев']
            } as any);

            const el = render(<ToReadBook book={value}/>);

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Андрей Круз, Андрей Царев')
        })

        test('renders no one author',  () => {
            const value = new Book({
                authors: []
            } as any);

            const el = render(<ToReadBook book={value}/>);

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Unknown author')
        })
    })
})

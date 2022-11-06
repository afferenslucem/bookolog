import { render } from "@testing-library/react";
import React from "react";
import { BookDate as BookDateModel } from "../../../../../../common/models/book/book-date";
import { BookDate } from "./BookDate";

describe('BookDate', () => {
    test('renders full date',  async () => {
        const value = new BookDateModel({
            year: 2022,
            month: 12,
            day: 21
        })

        const el = render(<BookDate value={value} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('2022.12.21')
    })

    test('renders date without day',  async () => {
        const value = new BookDateModel({
            year: 2022,
            month: 12,
        })

        const el = render(<BookDate value={value} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('2022.12.01')
    })

    test('renders date without month',  async () => {
        const value = new BookDateModel({
            year: 2022,
        })

        const el = render(<BookDate value={value} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('2022.01.01')
    })
})

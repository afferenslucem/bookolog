import { render } from "@testing-library/react";
import React from "react";
import BookDateInterval from "./BookDateInterval";
import { BookDate } from "../../../../common/models/book/book-date";

describe('BookPageProgress', () => {
    test('renders page progress',  async () => {
        const from = new BookDate({
            year: 2022,
            month: 12,
            day: 21
        })
        const to = new BookDate({
            year: 2023,
            month: 1,
            day: 2
        })

        const el = render(<BookDateInterval from={from} to={to} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('[2022.12.21 - 2023.01.02]')
    })

    test('renders placeholder instead of first date',  async () => {
        const to = new BookDate({
            year: 2023,
            month: 1,
            day: 2
        })

        const el = render(<BookDateInterval from={null!} to={to} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('[… - 2023.01.02]')
    })

    test('renders placeholder instead of second date',  async () => {
        const from = new BookDate({
            year: 2023,
            month: 1,
            day: 2
        })

        const el = render(<BookDateInterval from={from} to={null!} />);

        const content = el.asFragment().textContent;

        expect(content).toBe('[2023.01.02 - …]')
    })
})

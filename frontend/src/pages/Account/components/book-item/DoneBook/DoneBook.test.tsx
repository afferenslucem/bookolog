import { render } from "@testing-library/react";
import React from "react";
import { Book } from "../../../../../common/models/book/book";
import DoneBook from './DoneBook';
import { BookData } from "../../../../../common/models/book/book-data";
import { BrowserRouter as Router } from "react-router-dom";

describe('DoneBook', () => {
    test('renders header',  () => {
        const value = new Book({
            name: 'Кровь дракона'
        } as any);

        const el = render(
            <Router>
                <DoneBook book={value}/>
            </Router>
        );

        const content = el.asFragment().querySelector('.book__header')!;

        expect(content.textContent).toBe('Кровь дракона')
    })

    describe('Authors', () => {
        test('renders one author',  () => {
            const value = new Book({
                authors: ['Джордж Мартин']
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Джордж Мартин')
        })

        test('renders two author',  () => {
            const value = new Book({
                authors: ['Андрей Круз', 'Андрей Царев']
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Андрей Круз, Андрей Царев')
        })

        test('renders no one author',  () => {
            const value = new Book({
                authors: []
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Unknown author')
        })
    })

    describe('Dates', () => {
        test('renders dates for start date',  async () => {
            const value = new Book({
                startDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('renders dates for finish date',  async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('does not render for empty dates',  async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('renders both dates',  async () => {
            const value = new Book({
                startDateYear: 2021,
                startDateMonth: 2,
                startDateDay: 21,
                endDateYear: 2022,
                endDateMonth: 3,
                endDateDay: 12,
            } as BookData);

            const el = render(
                <Router>
                    <DoneBook book={value}/>
                </Router>
            );

            const interval = await el.findByTestId('book-dates-interval');
            expect(interval.textContent).toBe('[2021.02.21 - 2022.03.12]')
        })
    })
})

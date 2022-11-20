import { render } from "@testing-library/react";
import React from "react";
import { Book } from "../../../../../common/models/book/book";
import InProgressBook from './InProgressBook';
import { ProgressAlgorithmType } from "../../../../../common/models/book/progress/progress-algorithm-type";
import { BookType } from "../../../../../common/models/book/book-type";
import { BookData } from "../../../../../common/models/book/book-data";
import { BrowserRouter as Router } from "react-router-dom";

describe('InProgressBook', () => {
    test('renders header', () => {
        const value = new Book({
            name: 'Кровь дракона'
        } as any);

        const el = render(
            <Router>
                <InProgressBook book={value}/>
            </Router>
        );

        const content = el.asFragment().querySelector('.book__header')!;

        expect(content.textContent).toBe('Кровь дракона')
    })

    describe('Authors', () => {
        test('renders one author', () => {
            const value = new Book({
                authors: ['Джордж Мартин']
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Джордж Мартин')
        })

        test('renders two authors', () => {
            const value = new Book({
                authors: ['Андрей Круз', 'Андрей Царев']
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Андрей Круз, Андрей Царев')
        })

        test('renders no one author', () => {
            const value = new Book({
                authors: []
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Unknown author')
        })
    })

    describe('Progress line', () => {
        test('renders progress line by left progress', async () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = await el.findByTestId("progress-bar")!;

            expect(content.getAttribute('aria-valuenow')).toBe('81')
        })

        test('renders progress line by done progress', async () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Done,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = await el.findByTestId("progress-bar")!;

            expect(content.getAttribute('aria-valuenow')).toBe('19')
        })

        test('does not render progress line', () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Done,
                doneUnits: 19,
                totalUnits: 0,
                type: BookType.Paper
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector(`[data-testid="progress-bar"]`)!;

            expect(content).toBe(null)
        })
    })

    describe('Progress', () => {
        test('renders page progress', () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector(`.book-progress--page`)!;

            expect(content).toBeTruthy()
        })

        test('renders time progress', () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Audio
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector(`.book-progress--time`)!;

            expect(content).toBeTruthy()
        })

        test('does not render any progress', () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 0,
                totalUnits: 0,
                type: BookType.Audio
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector(`.book-progress`)!;

            expect(content).toBeFalsy()
        })
    })

    describe('Dates', () => {
        test('renders dates for start date', async () => {
            const value = new Book({
                startDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('renders dates for finish date', async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('does not render for empty dates', async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(
                <Router>
                    <InProgressBook book={value}/>
                </Router>
            );

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('does not render for end date', async () => {
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
                    <InProgressBook book={value}/>
                </Router>
            );

            const interval = await el.findByTestId('book-dates-interval');
            expect(interval.textContent).toBe('[2021.02.21 - …]')
        })
    })
})

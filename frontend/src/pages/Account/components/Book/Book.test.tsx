import { render } from "@testing-library/react";
import React from "react";
import { Book } from "../../../../common/models/book/book";
import BookComponent from './Book';
import { ProgressAlgorithmType } from "../../../../common/models/book/progress/progress-algorithm-type";
import { BookType } from "../../../../common/models/book/book-type";

describe('Book', () => {
    test('renders header',  () => {
        const value = new Book({
            name: 'Кровь дракона'
        } as any);

        const el = render(<BookComponent book={value}/>);

        const content = el.asFragment().querySelector('.book__header')!;

        expect(content.textContent).toBe('Кровь дракона')
    })

    describe('Authors', () => {

        test('renders one author',  () => {
            const value = new Book({
                authors: ['Джордж Мартин']
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Джордж Мартин')
        })

        test('renders two author',  () => {
            const value = new Book({
                authors: ['Андрей Круз', 'Андрей Царев']
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector('.book__authors')!;

            expect(content.textContent).toBe('Андрей Круз, Андрей Царев')
        })
    })

    describe('Progress line', () => {
        test('renders progress line by left progress',  async () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = await el.findByTestId("progress-bar")!;

            expect(content.getAttribute('aria-valuenow')).toBe('81')
        })

        test('renders progress line by done progress',  async () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Done,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = await el.findByTestId("progress-bar")!;

            expect(content.getAttribute('aria-valuenow')).toBe('19')
        })

        test('does not render progress line',  () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Done,
                doneUnits: 19,
                totalUnits: 0,
                type: BookType.Paper
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector(`[data-testid="progress-bar"]`)!;

            expect(content).toBe(null)
        })
    })

    describe('Progress', () => {
        test('renders page progress',  () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Paper
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector(`.book-progress--page`)!;

            expect(content).toBeTruthy()
        })

        test('renders time progress',  () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 19,
                totalUnits: 100,
                type: BookType.Audio
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector(`.book-progress--time`)!;

            expect(content).toBeTruthy()
        })

        test('does not render any progress',  () => {
            const value = new Book({
                progressType: ProgressAlgorithmType.Left,
                doneUnits: 0,
                totalUnits: 0,
                type: BookType.Audio
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = el.asFragment().querySelector(`.book-progress`)!;

            expect(content).toBeFalsy()
        })
    })

    describe('Dates', () => {
        test('renders dates for start date',  async () => {
            const value = new Book({
                startDateYear: 2022,
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('renders dates for finish date',  async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })

        test('does not renders for empty dates',  async () => {
            const value = new Book({
                endDateYear: 2022,
            } as any);

            const el = render(<BookComponent book={value}/>);

            const content = await el.asFragment().querySelector(`.book-dates-interval`)!;

            expect(content).toBeTruthy()
        })
    })
})

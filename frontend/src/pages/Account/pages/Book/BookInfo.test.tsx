import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookInfo, { BookView } from './BookInfo';
import { Book } from '../../../../common/models/book/book';
import { BookType } from '../../../../common/models/book/book-type';
import { BookStatus } from '../../../../common/models/book/book-status';
import { BookData } from '../../../../common/models/book/book-data';

describe('BookInfo', () => {
    describe('Authors', () => {
        test('renders one author', () => {
            const value = new Book({
                authors: ['Джордж Мартин']
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('authors');

            expect(content.textContent).toBe('Джордж Мартин')
        })

        test('renders no one author', () => {
            const value = new Book({
                authors: []
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="authors"]')!;

            expect(content).toBeNull()
        })
    })

    describe('Genre', () => {
        test('renders genre', () => {
            const value = new Book({
                genre: 'Детектив'
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('genre');

            expect(content.textContent).toBe('Детектив')
        })

        test('does not renders genre', () => {
            const value = new Book({
                genre: null
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="genre"]')!;

            expect(content).toBeNull()
        })
    })

    test('renders type', () => {
        const value = new Book({
            type: BookType.Paper
        } as any);

        const el = render(
            <Router>
                <BookView book={value}/>
            </Router>
        );

        const content = el.getByTestId('type');

        expect(content.textContent).toBe('Paper book')
    })

    test('renders status', () => {
        const value = new Book({
            status: BookStatus.ToRead
        } as any);

        const el = render(
            <Router>
                <BookView book={value}/>
            </Router>
        );

        const content = el.getByTestId('status');

        expect(content.textContent).toBe('To Read')
    })

    describe('Tags', () => {
        test('renders tags', () => {
            const value = new Book({
                tags: ['Tag 1', 'Tag 2']
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('tags');

            expect(content.textContent).toBe('Tag 1, Tag 2')
        })

        test('renders no one tag', () => {
            const value = new Book({
                authors: []
            } as any);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="tags"]')!;

            expect(content).toBeNull()
        })
    })

    describe('Starts Date', () => {
        test('renders start date for in progress', () => {
            const value = new Book({
                status: BookStatus.InProgress,
                startDateYear: 2022,
                startDateMonth: 10,
                startDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('start-date');

            expect(content.textContent).toBe('2022.10.23')
        })

        test('renders start date for done', () => {
            const value = new Book({
                status: BookStatus.Done,
                startDateYear: 2022,
                startDateMonth: 10,
                startDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('start-date');

            expect(content.textContent).toBe('2022.10.23')
        })

        test('does not render start date with empty year', () => {
            const value = new Book({
                status: BookStatus.Done,
                startDateYear: null,
                startDateMonth: 10,
                startDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="start-date"]');

            expect(content).toBeNull()
        })

        test('does not render start date for to read', () => {
            const value = new Book({
                status: BookStatus.ToRead,
                startDateYear: 2022,
                startDateMonth: 10,
                startDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="start-date"]');

            expect(content).toBeNull()
        })
    })

    describe('Finish Date', () => {
        test('does not render end date for in progress', () => {
            const value = new Book({
                status: BookStatus.InProgress,
                endDateYear: 2022,
                endDateMonth: 10,
                endDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="end-date"]');

            expect(content).toBeNull()
        })

        test('renders end date for done', () => {
            const value = new Book({
                status: BookStatus.Done,
                endDateYear: 2022,
                endDateMonth: 10,
                endDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.getByTestId('end-date');

            expect(content.textContent).toBe('2022.10.23')
        })

        test('does not render end date for done with empty year', () => {
            const value = new Book({
                status: BookStatus.Done,
                endDateYear: null,
                endDateMonth: 10,
                endDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );
            
            const content = el.asFragment().querySelector('[data-testid="end-date"]');

            expect(content).toBeNull()
        })

        test('does not render end date for to read', () => {
            const value = new Book({
                status: BookStatus.ToRead,
                endDateYear: 2022,
                endDateMonth: 10,
                endDateDay: 23
            } as BookData);

            const el = render(
                <Router>
                    <BookView book={value}/>
                </Router>
            );

            const content = el.asFragment().querySelector('[data-testid="end-date"]');

            expect(content).toBeNull()
        })
    })
})

import React from 'react';
import { render, waitFor } from "@testing-library/react";
import InProgress from "./InProgress";
import { httpClient } from "../../../../common/utils/http-client";
import { BookData } from "../../../../common/models/book/book-data";
import { BrowserRouter as Router } from "react-router-dom";
import SpyInstance = jest.SpyInstance;

describe('InProgress', () => {
    let getSpy: SpyInstance = null!;

    beforeEach(() => {
        getSpy = jest.spyOn(httpClient, 'get');
    })

    afterEach(() => {
        getSpy.mockRestore();
    })

    test('renders loader', async () => {
        getSpy.mockReturnValue(new Promise((_) => ({})))

        const el = render(
            <Router>
                <InProgress/>
            </Router>
        );

        const backdrop = await el.findByTestId("backdrop");

        expect(backdrop).toBeTruthy()
    });

    test('renders books', async () => {
        getSpy.mockReturnValue(new Promise(resolve => resolve({
            data: [
                {
                    name: 'first',
                    guid: 'guid1'
                },
                {
                    name: 'second',
                    guid: 'guid2'
                }
            ] as BookData[]
        })))

        const el = render(
            <Router>
                <InProgress/>
            </Router>
        );

        await waitFor(() => expect(getSpy).toHaveBeenCalled())

        const books = await el.findAllByTestId("in-progress-book");

        expect(books.length).toBe(2);
    });
})



import React from 'react';
import { render, waitFor } from "@testing-library/react";
import { httpClient } from "../../../../common/utils/http-client";
import SpyInstance = jest.SpyInstance;
import { BookData } from "../../../../common/models/book/book-data";
import Done from "./Done";
import { BrowserRouter as Router } from "react-router-dom";

describe('Done', () => {
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
                <Done/>
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
                <Done/>
            </Router>
        );

        await waitFor(() => expect(getSpy).toHaveBeenCalled())

        const books = await el.findAllByTestId("done-book");

        expect(books.length).toBe(2);
    });
})



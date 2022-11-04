import React from 'react';
import { render, waitFor } from "@testing-library/react";
import InProgress from "./InProgress";
import { httpClient } from "../../../../common/utils/http-client";
import SpyInstance = jest.SpyInstance;
import { BookData } from "../../../../common/models/book/book-data";

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

        const el = render(<InProgress/>);

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

        const el = render(<InProgress/>);

        await waitFor(() => expect(getSpy).toHaveBeenCalled())

        const books = await el.findAllByTestId("book");

        expect(books.length).toBe(2);
    });
})



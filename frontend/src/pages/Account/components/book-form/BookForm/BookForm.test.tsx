import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BookForm from "./BookForm";
import SpyInstance = jest.SpyInstance;
import { BookData } from "../../../../../common/models/book/book-data";
import { httpClient } from "../../../../../common/utils/http-client";

xdescribe('BookForm', () => {
    let getSpy: SpyInstance = null!;
    let submitSpy: SpyInstance<void, [BookData]> = null!;

    beforeEach(() => {
        getSpy = jest.spyOn(httpClient, 'get');
        submitSpy = jest.fn<void, [BookData]>();
    })

    afterEach(() => {
        getSpy.mockRestore();
    })

    test('fire name', async () => {
        const el = render(
            <Router>
                <BookForm />
            </Router>
        );

        const name = await el.findByTestId("name");
        fireEvent.change(name.querySelector('input')!, {target: {value: 'Война миров'}});

        const button = await el.findByText("Save");
        fireEvent.click(button);

        expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Война миров'
        }))
    });

    test('fire year', async () => {
        const el = render(
            <Router>
                <BookForm />
            </Router>
        );

        const year = await el.findByTestId("release-year");
        fireEvent.change(year.querySelector('input')!, {target: {value: '1934'}});

        const button = await el.findByText("Save");
        fireEvent.click(button);

        expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({
            year: 1934
        }))
    });

    test('fire status', async () => {
        const el = render(
            <Router>
                <BookForm />
            </Router>
        );

        const year = await el.findByTestId("status");
        fireEvent.change(year.querySelector('select')!, {target: {value: '2'}});

        const button = await el.findByText("Save");
        fireEvent.click(button);

        expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({
            status: 2
        }))
    });

    test('fire type', async () => {
        const el = render(
            <Router>
                <BookForm />
            </Router>
        );

        const year = await el.findByTestId("type");
        fireEvent.change(year.querySelector('select')!, {target: {value: '2'}});

        const button = await el.findByText("Save");
        fireEvent.click(button);

        expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({
            type: 2
        }))
    });

    test('fire progress type', async () => {
        const el = render(
            <Router>
                <BookForm />
            </Router>
        );

        const year = await el.findByTestId("progress-type");
        fireEvent.change(year.querySelector('select')!, {target: {value: 'Left'}});

        const button = await el.findByText("Save");
        fireEvent.click(button);

        expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({
            progressType: 'Left'
        }))
    });
})

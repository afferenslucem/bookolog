import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from "react-router-dom";
import BookForm from "./BookForm";
import { BookData } from "../../../../../common/models/book/book-data";
import { httpClient } from "../../../../../common/utils/http-client";
import SpyInstance = jest.SpyInstance;

describe('BookForm', () => {
    let getSpy: SpyInstance = null!;
    let submitSpy: SpyInstance<void, [BookData]> = null!;

    beforeEach(() => {
        getSpy = jest.spyOn(httpClient, 'get');
        submitSpy = jest.fn<void, [BookData]>();
    })

    afterEach(() => {
        getSpy.mockRestore();
    })

    describe('rendering', () => {
        describe('StartDate', () => {
            it('does not render for BookStatus.ToRead',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );

                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: 0}});

                const input = el.asFragment().querySelector('[data-testid="start-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.InProgress',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );


                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 1}})
                });

                const input = el.asFragment().querySelector('[data-testid="start-date"]');

                expect(input).toBeTruthy();
            })

            it('renders for BookStatus.Done',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );


                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 2}})
                });

                const input = el.asFragment().querySelector('[data-testid="start-date"]');

                expect(input).toBeTruthy();
            })
        });

        describe('EndDate', () => {
            it('does not render for BookStatus.ToRead',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );

                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: 0}});

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.InProgress',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );


                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 1}})
                });

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.Done',  async () => {
                const el = render(
                    <Router>
                        <BookForm />
                    </Router>
                );


                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 2}})
                });

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeTruthy();
            })
        });
    })
})

import React from 'react';
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import BookForm from "./BookForm";
import { BookData } from "../../../../../common/models/book/book-data";
import { httpClient } from "../../../../../common/utils/http-client";
import { BookStatus } from "../../../../../common/models/book/book-status";
import { BookType } from "../../../../../common/models/book/book-type";
import SpyInstance = jest.SpyInstance;

describe('BookForm', () => {
    let getSpy: SpyInstance = null!;
    let submitSpy: SpyInstance<void, [BookData]> = null!;
    let el: RenderResult;

    beforeEach(() => {
        getSpy = jest.spyOn(httpClient, 'get');
        submitSpy = jest.fn<void, [BookData]>();

        el = render(
            <BookForm />
        );
    })

    afterEach(() => {
        getSpy.mockRestore();
    })

    describe('rendering', () => {
        describe('StartDate', () => {
            it('does not render for BookStatus.ToRead',  async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: 0}});

                const input = el.asFragment().querySelector('[data-testid="start-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.InProgress',  async () => {
                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 1}})
                });

                const input = el.asFragment().querySelector('[data-testid="start-date"]');

                expect(input).toBeTruthy();
            })

            it('renders for BookStatus.Done',  async () => {
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
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: 0}});

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.InProgress',  async () => {
                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 1}})
                });

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeFalsy();
            })

            it('renders for BookStatus.Done',  async () => {
                const status = await el.findByTestId("status");

                await act(() => {
                    fireEvent.change(status.querySelector('select')!, {target: {value: 2}})
                });

                const input = el.asFragment().querySelector('[data-testid="end-date"]');

                expect(input).toBeTruthy();
            })
        });

        describe('ProgressInput', () => {
            it('does not renders progress for BookStatus.ToRead', async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: BookStatus.ToRead}});

                const input = el.asFragment().querySelector('[data-testid="progress"]');

                expect(input).toBeFalsy();
            })

            it('does not renders progress for BookStatus.Done', async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: BookStatus.Done}});

                const input = el.asFragment().querySelector('[data-testid="progress"]');

                expect(input).toBeFalsy();
            })

            it('renders page progress for BookType.Paper', async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: BookStatus.InProgress}});

                const type = await el.findByTestId("type");
                fireEvent.change(type.querySelector('select')!, {target: {value: BookType.Paper}});

                const input = el.asFragment().querySelector('[data-testid="page-progress"]');

                expect(input).toBeTruthy();
            })

            it('renders page progress for BookType.Electronic', async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: BookStatus.InProgress}});

                const type = await el.findByTestId("type");
                fireEvent.change(type.querySelector('select')!, {target: {value: BookType.Electronic}});

                const input = el.asFragment().querySelector('[data-testid="page-progress"]');

                expect(input).toBeTruthy();
            })

            it('renders time progress for BookType.Audio', async () => {
                const status = await el.findByTestId("status");
                fireEvent.change(status.querySelector('select')!, {target: {value: BookStatus.InProgress}});

                const type = await el.findByTestId("type");
                fireEvent.change(type.querySelector('select')!, {target: {value: BookType.Audio}});

                const input = el.asFragment().querySelector('[data-testid="time-progress"]');

                expect(input).toBeTruthy();
            })
        })
    })
})

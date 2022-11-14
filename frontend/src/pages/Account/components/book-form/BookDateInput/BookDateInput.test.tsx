import { fireEvent, render } from "@testing-library/react";
import BookForm from "../BookForm/BookForm";
import React from "react";
import BookDateInput from "./BookDateInput";
import { BookDate } from "../../../../../common/models/book/book-date";

describe('BookForm', () => {
    describe('Changes', () => {
        test('fire year change', async () => {
            const value: BookDate = {
                year: undefined,
                month: undefined,
                day: undefined,
            }

            const onChange = jest.fn();

            const el = render(
                <BookDateInput />
            );

            const year = await el.findByTestId("year");
            fireEvent.change(year.querySelector('input')!, {target: {value: '2022'}});

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                year: 2022
            }))
        });

        test('fire month change', async () => {
            const value: BookDate = {
                year: undefined,
                month: undefined,
                day: undefined,
            }

            const onChange = jest.fn();

            const el = render(
                <BookDateInput />
            );

            const year = await el.findByTestId("month");
            fireEvent.change(year.querySelector('input')!, {target: {value: '11'}});

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                month: 11
            }))
        });

        test('fire day change', async () => {
            const value: BookDate = {
                year: undefined,
                month: undefined,
                day: undefined,
            }

            const onChange = jest.fn();

            const el = render(
                <BookDateInput />
            );

            const year = await el.findByTestId("day");
            fireEvent.change(year.querySelector('input')!, {target: {value: '9'}});

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                day: 9
            }))
        });
    })

    describe('Label', () => {
        test('renders label', () => {
            const onChange = jest.fn();

            const el = render(
                <BookDateInput label="Label Text" />
            );

            const label = el.asFragment().querySelector('.book-date-input__label');

            expect(label!.textContent).toContain('Label Text');
        })

        test('does not render label', () => {
            const onChange = jest.fn();

            const el = render(
                <BookDateInput />
            );

            const label = el.asFragment().querySelector('.book-date-input__label');

            expect(label).toBeFalsy();
        })
    })
})

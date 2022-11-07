import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import AsyncAutocomplete from "./AsyncAutocomplete";

xdescribe('AsyncAutocomplete', () => {
    test('renders label',  async () => {
        const spy = jest.fn()

        const source = jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))

        let el: RenderResult = null!;

        act(() => {
            el = render(<AsyncAutocomplete value={['1']} onChange={spy} optionsSource={source} label="Label Text" />);
        });

        const labelElement = el.asFragment().querySelector('label');

        expect(labelElement!.textContent).toBe('Label Text')
    })

    test('asks data',  async () => {
        const spy = jest.fn()

        const source = jest.fn().mockReturnValue(Promise.resolve([1, 2, 3]))

        act(() => {
            render(<AsyncAutocomplete value={['1']} onChange={spy} optionsSource={source} label="Label Text" />);
        });

        expect(source).toHaveBeenCalled();
    })
})

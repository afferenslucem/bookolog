import { fireEvent, render, waitFor } from '@testing-library/react';
import TimeInput from './TimeInput';
import { act } from 'react-dom/test-utils';

describe('TimeInput', () => {
    it('sets value', async () => {
        const el = render(
            <TimeInput value={215} />
        )

        const hoursEl = await el.findByTestId('hours')
        const hoursInput = hoursEl.querySelector<HTMLInputElement>('input')!
        expect(hoursInput.value).toBe('3');

        const minEl = await el.findByTestId('minutes')
        const minInput = minEl.querySelector<HTMLInputElement>('input')!
        expect(minInput.value).toBe('35');
    })

    xit('fires event', async () => {
        const spy = jest.fn();

        const el = render(
            <TimeInput onChange={spy} />
        )

        const hoursEl = await el.findByTestId('hours')
        const hoursInput = hoursEl.querySelector<HTMLInputElement>('input')!
        fireEvent.change(hoursInput, { value: 2 })

        const minEl = await el.findByTestId('minutes')
        const minInput = minEl.querySelector<HTMLInputElement>('input')!
        fireEvent.change(minInput, { value: 23 })
    })
})

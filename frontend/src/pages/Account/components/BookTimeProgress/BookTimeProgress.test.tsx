import { render } from "@testing-library/react";
import React from "react";
import BookTimeProgress from "./BookTimeProgress";
import { TimeBookProgress } from "../../../../common/models/book/progress/time-book-progress";

describe('BookTimeProgress', () => {
    test('renders time progress',  async () => {
        const value = new TimeBookProgress();

        value.doneUnits = 2 * 60 + 55;
        value.totalUnits = 10 * 60;

        const el = render(<BookTimeProgress value={value}/>);

        const content = el.asFragment().textContent;

        expect(content).toBe('02:55 from 10:00')
    })
})

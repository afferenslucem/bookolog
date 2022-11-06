import { render } from "@testing-library/react";
import React from "react";
import BookPageProgress from "./BookPageProgress";
import { PageBookProgress } from "../../../../../../common/models/book/progress/page-book-progress";

describe('BookPageProgress', () => {
    test('renders page progress',  async () => {
        const value = new PageBookProgress();

        value.doneUnits = 42;
        value.totalUnits = 255;

        const el = render(<BookPageProgress value={value}/>);

        const content = el.asFragment().textContent;

        expect(content).toBe('42 from 255')
    })
})

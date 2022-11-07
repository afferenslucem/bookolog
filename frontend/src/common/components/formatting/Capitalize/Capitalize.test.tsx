import { render } from "@testing-library/react";
import React from "react";
import Capitalize from "./Capitalize";

describe('Capitalize', () => {
    test('capitalizes first letter', () => {
        const el = render(<Capitalize value={'hello'}/>);

        const content = el.asFragment();

        expect(content.textContent).toBe('Hello')
    })
})

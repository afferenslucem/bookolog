import React from 'react';
import LoginForm from "./LoginForm";
import { fireEvent, render } from "@testing-library/react";


test('renders learn react link', async () => {
    const spy = jest.fn();

    const el = render(<LoginForm onSubmit={spy}/>);

    const login = await el.findByTestId("login");
    fireEvent.change(login.querySelector('input')!, {target: {value: 'pushkin'}})

    const password = await el.findByTestId("password")
    fireEvent.change(password.querySelector('input')!, {target: {value: 'masterkey'}})

    const button = await el.findByText("Sign In");

    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith({
        login: 'pushkin',
        password: 'masterkey'
    });
});

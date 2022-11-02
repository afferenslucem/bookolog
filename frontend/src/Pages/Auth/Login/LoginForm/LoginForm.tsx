import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useInput } from "../../../../Common/Utils/hooks";

interface LoginFormProps {
    onSubmit: (credentials: { login: string, password: string }) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const { onSubmit } = props;

    const [loginProps] = useInput("");
    const [passwordProps] = useInput("");

    return (
        <form>
            <span className="form-header">Login</span>

            <TextField data-testid="login" label="Login" variant="outlined" {...loginProps} />
            <TextField data-testid="password" label="Password" variant="outlined" type="password"  {...passwordProps} />

            <Button type="button" color="primary" onClick={() => onSubmit({
                login: loginProps.value,
                password: passwordProps.value,
            })}> Sign In </Button>
        </form>
    )
}

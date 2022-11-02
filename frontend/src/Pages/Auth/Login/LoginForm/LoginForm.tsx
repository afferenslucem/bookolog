import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface LoginFormProps {
    onSubmit: (credentials: { login: string, password: string }) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const { onSubmit } = props;

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <span className="form-header">Login</span>

            <TextField data-testid="login" label="Login" variant="outlined" value={login} onChange={e => setLogin(e.target.value)} />
            <TextField data-testid="password" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button type="button" color="primary" onClick={() => onSubmit({login, password})}> Sign In </Button>
        </form>
    )
}

import { Credentials } from "../../models/credentials";
import LoginForm from "./LoginForm/LoginForm";
import { httpClient } from "../../../../common/utils/http-client";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Alert } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";

function Login() {
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <h2> Login </h2>
            {
                error && <LoginError error={error} />
            }
            <LoginForm onSubmit={
                (c) => sendLoginRequest(c)
                    .then(() => {
                        console.debug('logged in')
                        setError(null);
                        return navigate('/in-progress')
                    })
                    .catch(e => {
                        console.debug('Log in error')
                        setError(e);
                    })
            } />
        </div>
    )
}

function LoginError(props: { error: AxiosError }) {
    return <Alert severity="error">{props.error.response?.data as string}</Alert>
}

async function sendLoginRequest(credentials: Credentials): Promise<AxiosResponse | AxiosError> {
    console.debug('send login')

    const result = await httpClient.post('/auth/login', credentials);

    return result;
}

export default Login;

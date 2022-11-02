import LoginForm from "./LoginForm/LoginForm";

function Login() {
    return (
        <LoginForm onSubmit={console.debug} />
    )
}

export default Login;

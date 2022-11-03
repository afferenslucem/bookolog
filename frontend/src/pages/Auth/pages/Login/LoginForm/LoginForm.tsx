import { Button, TextField } from "@mui/material";
import { useInput } from "../../../../../common/utils/hooks";
import { Credentials } from "../../../models/credentials";

interface LoginFormProps {
    onSubmit: (credentials: Credentials) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const {onSubmit} = props;

    const [loginProps] = useInput("");
    const [passwordProps] = useInput("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            onSubmit({
                login: loginProps.value,
                password: passwordProps.value,
            })
        }}>
            <TextField data-testid="login" label="Login" variant="outlined" {...loginProps} />
            <TextField data-testid="password" label="Password" variant="outlined" type="password"  {...passwordProps} />

            <Button type="submit" color="primary"> Sign In </Button>
        </form>
    )
}

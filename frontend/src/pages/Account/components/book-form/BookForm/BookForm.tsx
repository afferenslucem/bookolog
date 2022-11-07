import { BookData } from "../../../../../common/models/book/book-data";
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import AuthorsInput from "../AuthorsInput/AuthorsInput";

interface BookFormProps {
    onSubmit: (value: BookData) => void;
    value?: BookData;
}

const bookDefault: BookData = {
    name: '',
    authors: [] as string[],
} as BookData;

export default class BookForm extends React.Component<BookFormProps, BookData> {
    public constructor(props: any) {
        super(props);

        this.state = this.props.value ?? bookDefault;
    }

    public render() {
        return (
            <form onChange={e => console.debug(this.state)}>
                <TextField
                    data-testid="name"
                    label="Name"
                    variant="outlined"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                />

                <AuthorsInput value={this.state.authors!} onChange={e => this.setState({authors: e})} />
            </form>
        )
    }
}

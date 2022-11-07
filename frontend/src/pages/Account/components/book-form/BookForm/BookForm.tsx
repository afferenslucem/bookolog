import { BookData } from "../../../../../common/models/book/book-data";
import React, { FormEvent } from "react";
import { Button, FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import AuthorsInput from "../AuthorsInput/AuthorsInput";
import TagsInput from "../TagsInput/TagsInput";
import GenreInput from "../GenresInput/GenreInput";
import { BookStatus } from "../../../../../common/models/book/book-status";
import { BookType } from "../../../../../common/models/book/book-type";
import { ProgressAlgorithmType } from "../../../../../common/models/book/progress/progress-algorithm-type";

interface BookFormProps {
    onSubmit: (value: BookData) => void;
    value?: BookData;
}

const bookDefault: BookData = {
    name: '',
    authors: [] as string[],
    tags: [] as string[],
    year: null,
    genre: null,
    status: 1,
    type: 0,
    progressType: ProgressAlgorithmType.Done
} as BookData;

export default class BookForm extends React.Component<BookFormProps, BookData> {
    public constructor(props: any) {
        super(props);

        this.state = this.props.value ?? bookDefault;

        this.handleStatus = this.handleStatus.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleProgressType = this.handleProgressType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    data-testid="name"
                    label="Name"
                    variant="outlined"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                />

                <AuthorsInput value={this.state.authors!} onChange={e => this.setState({authors: e})}/>

                <TextField
                    data-testid="year"
                    label="Release year"
                    variant="outlined"
                    type="number"
                    value={this.state.year ?? ''}
                    onChange={e => this.setState({year: +e.target.value})}
                />

                <TagsInput value={this.state.tags!} onChange={e => this.setState({tags: e})}/>

                <GenreInput value={this.state.genre!} onChange={e => this.setState({genre: e})}/>

                <FormControl fullWidth>
                    <InputLabel htmlFor="book-status">Status</InputLabel>
                    <Select
                        native
                        value={this.state.status?.toString()}
                        onChange={this.handleStatus}
                        data-testid="status"
                        input={<OutlinedInput label="Status" id="book-status" />}
                    >
                        <option value={BookStatus.ToRead}>To Read</option>
                        <option value={BookStatus.InProgress}>In Progress</option>
                        <option value={BookStatus.Done}>Done</option>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="book-type">Type</InputLabel>
                    <Select
                        native
                        value={this.state.type?.toString()}
                        onChange={this.handleType}
                        data-testid="type"
                        input={<OutlinedInput label="Type" id="book-type" />}
                    >
                        <option value={BookType.Paper}>Paper</option>
                        <option value={BookType.Electronic}>Electronic</option>
                        <option value={BookType.Audio}>Audio</option>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="book-progress-type">Progress Type</InputLabel>
                    <Select
                        native
                        value={this.state.progressType?.toString()}
                        onChange={this.handleProgressType}
                        data-testid="progress-type"
                        input={<OutlinedInput label="Progress Type" id="book-progress-type" />}
                    >
                        <option value={ProgressAlgorithmType.Done}>Done</option>
                        <option value={ProgressAlgorithmType.Left}>Left</option>
                    </Select>
                </FormControl>

                <Button type="submit" color="primary"> Save </Button>
            </form>
        )
    }

    private handleStatus(e: SelectChangeEvent): void {
        const value = e.target.value;

        const status = Number(value);

        this.setState({status})
    }

    private handleType(e: SelectChangeEvent): void {
        const value = e.target.value;

        const type = Number(value);

        this.setState({type})
    }

    private handleProgressType(e: SelectChangeEvent): void {
        const value = e.target.value;

        this.setState({progressType: value as ProgressAlgorithmType})
    }

    private handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        this.props.onSubmit(this.state);
    }
}

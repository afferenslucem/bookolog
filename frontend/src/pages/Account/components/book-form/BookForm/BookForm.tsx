import { BookData } from "../../../../../common/models/book/book-data";
import React from "react";
import { Button, FormControl, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";
import AuthorsInput from "../AuthorsInput/AuthorsInput";
import TagsInput from "../TagsInput/TagsInput";
import GenreInput from "../GenresInput/GenreInput";
import { BookStatus } from "../../../../../common/models/book/book-status";
import { BookType } from "../../../../../common/models/book/book-type";
import { ProgressAlgorithmType } from "../../../../../common/models/book/progress/progress-algorithm-type";
import { FormProvider, useForm } from "react-hook-form";
import StartDateInput from "../StartDateInput";
import EndDateInput from "../EndDateInput";
import ProgressInput from "../ProgressInput/ProgressInput";

interface BookFormProps {
    onSubmit?: (value: BookData) => void;
    value?: BookData;
}

export const defaultBookCreateModel: BookData = {
    name: '',
    authors: [] as string[],
    tags: [] as string[],
    year: null,
    genre: null,
    status: BookStatus.InProgress,
    type: BookType.Paper,
    progressType: ProgressAlgorithmType.Done,
    startDateYear: null,
    startDateMonth: null,
    startDateDay: null,
    endDateYear: null,
    endDateMonth: null,
    endDateDay: null,
} as BookData;

export default function BookForm(props: BookFormProps) {
    const bookValue = props.value ?? defaultBookCreateModel

    const methods = useForm<BookData>({ defaultValues: bookValue, reValidateMode: 'onBlur' });
    const { handleSubmit, register, formState: { errors } } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(props.onSubmit!)}>
                <TextField
                    data-testid="name"
                    error={!!errors.name}
                    label="Name"
                    variant="outlined"
                    {...register('name', { required: true })}
                />

                <AuthorsInput/>

                <TextField
                    data-testid="release-year"
                    label="Release year"
                    variant="outlined"
                    type="number"
                    {...register('year')}
                />

                <TagsInput/>

                <GenreInput/>

                <FormControl fullWidth>
                    <InputLabel htmlFor="book-status">Status</InputLabel>
                    <Select
                        native
                        data-testid="status"
                        input={<OutlinedInput label="Status" id="book-status"/>}
                        {...register('status', { valueAsNumber: true })}
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
                        data-testid="type"
                        input={<OutlinedInput label="Type" id="book-type"/>}
                        {...register('type', { valueAsNumber: true })}
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
                        data-testid="progress-type"
                        input={<OutlinedInput label="Progress Type" id="book-progress-type"/>}
                        {...register('progressType')}
                    >
                        <option value={ProgressAlgorithmType.Done}>Done</option>
                        <option value={ProgressAlgorithmType.Left}>Left</option>
                    </Select>
                </FormControl>

                <StartDateInput data-testid="start-date"/>
                <EndDateInput data-testid="end-date"/>

                <ProgressInput/>

                <TextField
                    data-testid="note"
                    label="Note"
                    variant="outlined"
                    multiline
                    {...register('note')}
                />

                <Button type="submit" color="primary"> Save </Button>
            </form>
        </FormProvider>
    )
}

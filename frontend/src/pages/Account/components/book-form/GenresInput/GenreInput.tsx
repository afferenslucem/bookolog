import React, { useState } from "react";
import { BookLoader } from "../../../../../common/utils/book-loader";
import AsyncAutocomplete from "../../../../../common/components/inputs/AsyncAutocomplete";
import { useOnInit } from "../../../../../common/utils/hooks";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Capitalizer } from "../../../../../common/utils/capitalizer";

interface AuthorsInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

export default function GenreInput(props: AuthorsInputProps) {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<string[]>([]);
    const [value, setValue] = useState<string>(props.value);

    useOnInit(() => {
        setLoading(true)
        new BookLoader().getAllGenres()
            .then(data => new Capitalizer().capitalize(data))
            .then(setOptions)
            .finally(() => setLoading(false));
    })

    return (
        <Autocomplete
            value={value}
            onChange={(_, newValue)=> {
                setValue(newValue!);
                props.onChange(newValue!);
            }}
            options={options}
            filterSelectedOptions
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    label="Genre"
                />
            )}
        />
    )
}

import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useOnInit } from "../../../../../common/utils/hooks";
import { BookLoader } from "../../../../../common/utils/book-loader";

interface AuthorsInputProps {
    value: string[];
    onChange: (newValue: string[]) => void;
}

export default function AuthorsInput(props: AuthorsInputProps) {
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>(Array.from(props.value));

    useOnInit(() => {
        setLoading(true)
        new BookLoader().getAllAuthors()
            .then(setAuthors)
            .finally(() => setLoading(false));
    })

    return (
        <Autocomplete
            multiple
            value={value}
            onChange={(_, newValue)=> {
                setValue(newValue);
                props.onChange(newValue);
            }}
            options={authors}
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
                    label="Authors"
                />
            )}
        />
    )
}

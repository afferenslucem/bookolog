import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useOnInit } from "../../utils/hooks";

interface Props {
    value: string[];
    onChange: (newValue: string[]) => void;
    optionsSource: () => Promise<string[]>;
    label: string;
    multiple?: boolean
}

export default function AsyncAutocomplete(props: Props) {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>(Array.from(props.value));

    useOnInit(() => {
        setLoading(true)
        props.optionsSource()
            .then(setOptions)
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
                    label={props.label}
                />
            )}
        />
    )
}

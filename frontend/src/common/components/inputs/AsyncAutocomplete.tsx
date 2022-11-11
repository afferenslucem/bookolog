import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useOnInit } from "../../utils/hooks";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

interface Props {
    optionsSource: () => Promise<string[]>;
    label: string;
    name: string;
}

export default function AsyncAutocomplete(props: Props) {
    const {control, register } = useFormContext();
    const {replace} = useFieldArray({control, name: props.name});
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<string[]>([]);

    useOnInit(() => {
        setLoading(true)
        props.optionsSource()
            .then(setOptions)
            .finally(() => setLoading(false));
    })

    return (
        <Autocomplete
            multiple
            options={options}
            filterSelectedOptions
            loading={loading}
            onChange={(_, newValue)=> {
                replace(newValue);
            }}
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

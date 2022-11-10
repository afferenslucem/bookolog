import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useOnInit } from "../../utils/hooks";
import { useForm, useFormContext } from "react-hook-form";

interface Props {
    optionsSource: () => Promise<string[]>;
    label: string;
    name: string;
}

export default function AsyncAutocomplete(props: Props) {
    const { register } = useFormContext();
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<string[]>([]);

    const methods = register(props.name);

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
            {...methods}
            onChange={
                (_, newValue) => {
                    methods.onChange({
                        target: {
                            value: newValue
                        }
                    })
                }
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...register(props.name)}
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

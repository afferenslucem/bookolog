import React from "react";
import { BookLoader } from "../../../../../common/utils/book-loader";
import AsyncAutocomplete from "../../../../../common/components/inputs/AsyncAutocomplete";
import { Capitalizer } from "../../../../../common/utils/capitalizer";

interface AuthorsInputProps {
    value: string[];
    onChange: (newValue: string[]) => void;
}

export default function AuthorsInput(props: AuthorsInputProps) {
    const source = new BookLoader()
        .getAllAuthors()

    return (
        <AsyncAutocomplete
            value={Array.from(props.value)}
            onChange={props.onChange}
            optionsSource={() => source}
            label="Authors"/>
    )
}

import React from "react";
import { BookLoader } from "../../../../../common/utils/book-loader";
import AsyncAutocomplete from "../../../../../common/components/inputs/AsyncAutocomplete";

interface AuthorsInputProps {
    value?: string[];
    onChange?: (newValue: string[]) => void;
}

export default function AuthorsInput(props: AuthorsInputProps) {
    const source = new BookLoader()
        .getAllAuthors()

    return (
        <AsyncAutocomplete
            name="authors"
            optionsSource={() => source}
            label="Authors"/>
    )
}

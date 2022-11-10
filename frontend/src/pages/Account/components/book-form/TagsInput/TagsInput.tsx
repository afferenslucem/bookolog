import React from "react";
import { BookLoader } from "../../../../../common/utils/book-loader";
import AsyncAutocomplete from "../../../../../common/components/inputs/AsyncAutocomplete";
import { Capitalizer } from "../../../../../common/utils/capitalizer";

interface AuthorsInputProps {
    value?: string[];
    onChange?: (newValue: string[]) => void;
}

export default function TagsInput(props: AuthorsInputProps) {
    const source = new BookLoader()
        .getAllTags()
        .then(data => new Capitalizer().capitalize(data))

    return (
        <AsyncAutocomplete
            name="tags"
            optionsSource={() => source}
            label="Tags"/>
    )
}

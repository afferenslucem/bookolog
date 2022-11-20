import React from "react";
import { BookLoader } from "../../../../../common/utils/book-loader";
import AsyncAutocomplete from "../../../../../common/components/inputs/AsyncAutocomplete";
import { Capitalizer } from "../../../../../common/utils/capitalizer";

interface TagsInputProps {
    value?: string[];
    onChange?: (newValue: string[]) => void;
}

export default function TagsInput(props: TagsInputProps) {
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

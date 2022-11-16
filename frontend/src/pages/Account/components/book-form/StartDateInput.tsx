import { useFormContext } from "react-hook-form";
import { BookData } from "../../../../common/models/book/book-data";
import { BookStatus } from "../../../../common/models/book/book-status";
import BookDateInput from "./BookDateInput/BookDateInput";
import React from "react";

export default function StartDateInput(props: any) {
    const {watch} = useFormContext<BookData>();

    const status = watch("status")

    return status !== BookStatus.ToRead
        ? <BookDateInput {...props} label="Finish date" propertyPrefix="end"/>
        : null
}

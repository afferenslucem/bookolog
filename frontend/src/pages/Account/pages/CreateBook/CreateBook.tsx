import { useNavigate, useParams } from "react-router-dom";
import { BookLoader } from "../../../../common/utils/book-loader";
import BookForm, { defaultBookCreateModel } from "../../components/book-form/BookForm/BookForm";
import { BookData } from '../../../../common/models/book/book-data';
import { BookStatus } from '../../../../common/models/book/book-status';
import { useState } from "react";

interface CreateBookParams {
    status: string;

    [key: string]: string;
}

export default function CreateBook() {
    const { status } = useParams<CreateBookParams>();
    const navigate = useNavigate();

    const value = {
        ...defaultBookCreateModel,
        status: Number(status)
    }

    return (
        <BookForm value={value} onSubmit={book => onSubmit(book, navigate)}/>
    )
}

function onSubmit(book: BookData, navigate: (to: string) => void) {
    book.guid = crypto.randomUUID();

    new BookLoader().create(book)
        .then(() => {
            if (book.status === BookStatus.Done) {
                navigate('/done')
            }
            if (book.status === BookStatus.ToRead) {
                navigate('/to-read')
            }
            if (book.status === BookStatus.InProgress) {
                navigate('/in-progress')
            }
        })
}

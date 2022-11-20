import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useOnInit } from "../../../../common/utils/hooks";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import Loader from "../../../../common/components/Loader/Loader";
import BookForm from "../../components/book-form/BookForm/BookForm";
import { BookData } from '../../../../common/models/book/book-data';
import { BookStatus } from '../../../../common/models/book/book-status';

interface EditBookParams {
    guid: string;

    [key: string]: string;
}

export default function EditBook() {
    const { guid } = useParams<EditBookParams>();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState<BookData>(null!);
    const navigate = useNavigate();


    useOnInit(() => {
        setLoading(true)

        new BookLoader().getBook(guid!)
            .then(data => data.convertToDTO())
            .then(setBook)
            .finally(() => setLoading(false));

    })

    return (
        loading
            ? <Loader/>
            : <BookForm value={book} onSubmit={book => onSubmit(book, navigate)}/>
    )
}

function onSubmit(book: BookData, navigate: (to: string) => void) {

    new BookLoader().update(book)
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

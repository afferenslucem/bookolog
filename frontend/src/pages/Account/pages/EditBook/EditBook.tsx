import { useParams } from "react-router-dom";
import { useState } from "react";
import { useOnInit } from "../../../../common/utils/hooks";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import Loader from "../../../../common/components/Loader/Loader";
import BookForm from "../../components/book-form/BookForm/BookForm";

interface EditBookParams {
    guid: string;

    [key: string]: string;
}

export default function EditBook() {
    const {guid} = useParams<EditBookParams>();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState<Book>(null!);

    useOnInit(() => {
        setLoading(true)

        new BookLoader().getBook(guid!)
            .then(setBook)
            .finally(() => setLoading(false));

    })

    return (
        loading
            ? <Loader/>
            :
            <div>
                <BookForm onSubmit={(data) => console.debug(data)} />
            </div>
    )
}

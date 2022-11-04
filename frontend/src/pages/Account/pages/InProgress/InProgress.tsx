import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book as BookModel } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";
import Book from "../../components/Book/Book";

import './InProgress.scss';
import { CircularProgress } from "@mui/material";

export default function InProgress() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<BookModel[]>([]);

    useOnInit(() => {
        setLoading(true);
        new BookLoader().getBooksInProgress()
            .then(books => setBooks(books))
            .finally(() => setLoading(false));
    })

    return (
        <div className="in-progress">
            {
                loading
                    ? <div className="in-progress__loading">
                        <CircularProgress size="6rem"/>
                      </div>
                    : books.map(book => <Book key={book.guid} book={book}/>)
            }
        </div>
    )
}

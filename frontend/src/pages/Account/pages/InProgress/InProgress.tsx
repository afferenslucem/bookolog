import { useEffect, useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book as BookModel } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";
import Book from "../../components/Book/Book";

import './InProgress.scss';

export default function InProgress() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<BookModel[]>([]);

    useOnInit(() => {
        new BookLoader().getBooksInProgress()
            .then(books => setBooks(books))
    })

    return (
        <div className="in-progress">
            {
                books.map(book => <Book key={book.guid} book={book} />)
            }
        </div>
    )
}

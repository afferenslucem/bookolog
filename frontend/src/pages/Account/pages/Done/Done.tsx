import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book as BookModel } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";
import Book from "../../components/Book/Book";

import Loader from "../../../../common/components/Loader/Loader";

// TODO: DoneBook

export default function Done() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<BookModel[]>([]);

    useOnInit(() => {
        setLoading(true);
        new BookLoader().getBooksDone()
            .then(books => setBooks(books))
            .finally(() => setLoading(false));
    })

    return (
        <div className="books-done book-list">
            {
                loading
                    ? <Loader data-testid="backdrop" />
                    : books.map(book => <Book key={book.guid} book={book}/>)
            }
        </div>
    )
}

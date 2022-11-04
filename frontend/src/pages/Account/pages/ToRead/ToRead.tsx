import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";
import InProgressBook from "../../components/InProgressBook/InProgressBook";

import Loader from "../../../../common/components/Loader/Loader";

// TODO: ToReadBook

export default function ToRead() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    useOnInit(() => {
        setLoading(true);
        new BookLoader().getBooksToRead()
            .then(books => setBooks(books))
            .finally(() => setLoading(false));
    })

    return (
        <div className="books-done book-list">
            {
                loading
                    ? <Loader data-testid="backdrop" />
                    : books.map(book => <InProgressBook key={book.guid} book={book}/>)
            }
        </div>
    )
}

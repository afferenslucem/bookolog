import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";

import Loader from "../../../../common/components/Loader/Loader";
import ToReadBook from "../../components/book-item/ToReadBook/ToReadBook";

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
        <div className="book-list">
            {
                loading
                    ? <Loader data-testid="backdrop" />
                    : books.map(book => <ToReadBook key={book.guid} book={book}/>)
            }
        </div>
    )
}

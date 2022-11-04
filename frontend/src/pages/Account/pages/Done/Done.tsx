import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";

import Loader from "../../../../common/components/Loader/Loader";
import DoneBook from "../../components/DoneBook/DoneBook";

// TODO: DoneBook

export default function Done() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

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
                    : books.map(book => <DoneBook key={book.guid} book={book}/>)
            }
        </div>
    )
}

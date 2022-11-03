import { useEffect, useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book";

export default function InProgress() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        new BookLoader().getBooksInProgress()
            .then(books => setBooks(books))
    })

    return (
        <div>
            {
                books.map(book => (
                    <div key={book.guid}>
                        {book.name}
                    </div>
                ))
            }
        </div>
    )
}

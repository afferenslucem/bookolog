import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";

import Loader from "../../../../common/components/Loader/Loader";
import ToReadBook from "../../components/book-item/ToReadBook/ToReadBook";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ToRead() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

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
            {
                !loading &&
                <Fab className="book-list__add-icon" data-testid="add" size="medium" color="secondary" aria-label="add" onClick={() => navigate('/create-book/0')}>
                    <AddIcon />
                </Fab>
            }
        </div>
    )
}

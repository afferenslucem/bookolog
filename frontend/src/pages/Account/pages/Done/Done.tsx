import { useState } from "react";
import { BookLoader } from "../../../../common/utils/book-loader";
import { Book } from "../../../../common/models/book/book";
import { useOnInit } from "../../../../common/utils/hooks";

import Loader from "../../../../common/components/Loader/Loader";
import DoneBook from "../../components/book-item/DoneBook/DoneBook";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function Done() {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

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
            {
                !loading &&
                <Fab className="book-list__add-icon" data-testid="add" size="medium" color="secondary" aria-label="add" onClick={() => navigate('/create-book/2')}>
                    <AddIcon />
                </Fab>
            }
        </div>
    )
}

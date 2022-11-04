import { Book as BookModel } from "../../../../common/models/book/book";
import { memo } from "react";

import './Book.scss';
import { LinearProgress } from "@mui/material";
import { BookType } from "../../../../common/models/book/book-type";
import BookPageProgress from "../BookPageProgress/BookPageProgress";
import { PageBookProgress } from "../../../../common/models/book/progress/page-book-progress";
import BookTimeProgress from "../BookTimeProgress/BookTimeProgress";
import { TimeBookProgress } from "../../../../common/models/book/progress/time-book-progress";
import BookDateInterval from "../BookDateInterval/BookDateInterval";

function BookComponent(props: { book: BookModel }) {
    const {book} = props;

    return (
        <div className="book" data-testid="book">
            <div className="book__header">
                {book.name}
            </div>
            {
                book.authors?.length
                && <div className="book__authors secondary">
                    {book.authors.join(', ')}
                </div>
                || null
            }
            {
                book.progress.totalNumeric
                && <LinearProgress data-testid="progress-bar" variant="determinate" value={book.progress.progressPercent} />
                || null
            }
            <div className="book__bottom secondary">
                <div className="book__progress">
                    {
                        book.progress.totalUnits && (
                            book.type == BookType.Audio
                            ? <BookTimeProgress value={book.progress as TimeBookProgress} />
                            : <BookPageProgress value={book.progress as PageBookProgress} />
                        ) || null
                    }
                </div>

                <div className="book__dates">
                    {
                        (book.started?.year || book.finished?.year ) && (
                            <BookDateInterval data-testid="date-interval" from={book.started} to={book.finished} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const Book = memo(BookComponent);

export default Book;

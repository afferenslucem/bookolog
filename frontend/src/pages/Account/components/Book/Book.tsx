import { Book } from "../../../../common/models/book";
import { memo } from "react";

import './Book.scss';
import { LinearProgress } from "@mui/material";
import { BookType } from "../../../../common/models/book-type";
import BookPageProgress from "../BookPageProgress/BookPageProgress";
import { PageBookProgress } from "../../../../common/models/page-book-progress";
import BookTimeProgress from "../BookTimeProgress/BookTimeProgress";
import { TimeBookProgress } from "../../../../common/models/time-book-progress";

function BookComponent(props: { book: Book }) {
    const {book} = props;

    return (
        <div className="book">
            <div className="book__header">
                {book.name}
            </div>
            {
                book.authors?.length &&
                <div className="book__authors secondary">
                    {book.authors.join(', ')}
                </div>
            }
            {
                book.progress.totalNumeric &&
                <LinearProgress variant="determinate" value={book.progress.progressPercent} />
            }
            <div className="book__bottom secondary">
                <div>
                    {
                        book.progress.totalUnits != null && (
                            book.type == BookType.Audio
                            ? <BookTimeProgress value={book.progress as TimeBookProgress} />
                            : <BookPageProgress value={book.progress as PageBookProgress} />
                        )
                    }
                </div>


                <div className="book__dates">

                </div>
            </div>
        </div>
    )
}

const PureBook = memo(BookComponent);

export default PureBook;

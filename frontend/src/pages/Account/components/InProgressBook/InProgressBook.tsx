import { Book } from "../../../../common/models/book/book";
import { memo } from "react";
import { LinearProgress } from "@mui/material";
import { BookType } from "../../../../common/models/book/book-type";
import BookPageProgress from "../BookPageProgress/BookPageProgress";
import { PageBookProgress } from "../../../../common/models/book/progress/page-book-progress";
import BookTimeProgress from "../BookTimeProgress/BookTimeProgress";
import { TimeBookProgress } from "../../../../common/models/book/progress/time-book-progress";
import BookDateInterval from "../BookDateInterval/BookDateInterval";

function InProgressBookComponent(props: { book: Book }) {
    const {book} = props;

    return (
        <div className="book book--in-progress" data-testid="in-progress-book">
            <div className="book__header">
                {book.name}
            </div>
            <div className="book__authors secondary">
                {
                    book.authors?.length
                    ? book.authors.join(', ')
                    : 'Unknown author'
                }
            </div>
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
                            <BookDateInterval from={book.started} to={null!} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const InProgressBook = memo(InProgressBookComponent);

export default InProgressBook;

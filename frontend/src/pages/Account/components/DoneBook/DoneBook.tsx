import { Book as BookModel } from "../../../../common/models/book/book";
import { memo } from "react";
import BookDateInterval from "../BookDateInterval/BookDateInterval";

function DoneBookComponent(props: { book: BookModel }) {
    const {book} = props;

    return (
        <div className="book book--in-progress" data-testid="done-book">
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
            <div className="book__bottom secondary">
                <div className="book__dates">
                    {
                        (book.started?.year || book.finished?.year ) && (
                            <BookDateInterval from={book.started} to={book.finished} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const DoneBook = memo(DoneBookComponent);

export default DoneBook;

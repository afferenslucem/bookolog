import { Book } from "../../../../../common/models/book/book";
import { memo } from "react";
import Join from "../../../../../common/components/formatting/Join/Join";

function ToReadBookComponent(props: { book: Book }) {
    const {book} = props;

    return (
        <div className="book book--to-read" data-testid="to-read-book">
            <div className="book__header">
                {book.name}
            </div>
            <div className="book__authors secondary">
                <Join value={book.authors}/>
            </div>
        </div>
    )
}

const ToReadBook = memo(ToReadBookComponent);

export default ToReadBook;

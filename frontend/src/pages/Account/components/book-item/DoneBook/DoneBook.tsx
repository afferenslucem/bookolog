import { Book as BookModel } from "../../../../../common/models/book/book";
import { memo } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BookDateInterval from "../common/BookDateInterval/BookDateInterval";
import { useNavigate } from "react-router-dom";

function DoneBookComponent(props: { book: BookModel }) {
    const {book} = props;
    const navigate = useNavigate();

    return (
        <div className="book book--in-progress" data-testid="done-book">
            <div className="book__header">
                <span>
                    {book.name}
                </span>
                <EditOutlinedIcon className="edit-icon" onClick={() => navigate(`../edit-book/${book.guid}`)}/>
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

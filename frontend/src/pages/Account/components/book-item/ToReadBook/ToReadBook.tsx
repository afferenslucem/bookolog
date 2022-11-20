import { Book } from "../../../../../common/models/book/book";
import { memo } from "react";
import Join from "../../../../../common/components/formatting/Join/Join";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

function ToReadBookComponent(props: { book: Book }) {
    const { book } = props;
    const navigate = useNavigate();

    return (
        <div className="book book--to-read" data-testid="to-read-book">
            <div className="book__header">
                <span>
                    {book.name}
                </span>
                <EditOutlinedIcon className="edit-icon" onClick={() => navigate(`../edit-book/${book.guid}`)}/>
            </div>
            <div className="book__authors secondary">
                <Join value={book.authors}/>
            </div>
        </div>
    )
}

const ToReadBook = memo(ToReadBookComponent);

export default ToReadBook;

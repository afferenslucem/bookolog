import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useOnInit } from '../../../../common/utils/hooks';
import { BookLoader } from '../../../../common/utils/book-loader';
import Loader from '../../../../common/components/Loader/Loader';
import { Book } from '../../../../common/models/book/book';
import Join from '../../../../common/components/formatting/Join/Join';
import { BookType } from '../../../../common/models/book/book-type';
import Capitalize from '../../../../common/components/formatting/Capitalize/Capitalize';
import { BookStatus } from '../../../../common/models/book/book-status';
import { BookDate } from '../../components/book-item/common/BookDate/BookDate';

interface BookParams {
    guid: string;

    [key: string]: string;
}

export default function BookInfo() {
    const { guid } = useParams<BookParams>();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState<Book>(null!);


    useOnInit(() => {
        setLoading(true)

        new BookLoader().getBook(guid!)
            .then(setBook)
            .finally(() => setLoading(false));

    })

    return (
        loading
            ? <Loader/>
            : <Page book={book}/>
    )
}

function Page(props: { book: Book }) {
    const { book } = props;

    return <BookView book={book} />
}

export function BookView(props: {book: Book}) {
    const {book} = props;

    return (
        <div className="book-info page">
            <h2>{book.name}</h2>

            {
                book.authors.length &&
                <div className="info-row">
                    <h4 className="info-row__label">Authors</h4>
                    <div className="info-row__value" data-testid="authors">
                        <Join value={book.authors}/>
                    </div>
                </div> || null
            }

            {
                book.genre &&
                <div className="info-row">
                    <h4 className="info-row__label">Genre</h4>
                    <div className="info-row__value" data-testid="genre">
                        <Capitalize value={book.genre}/>
                    </div>
                </div> || null
            }

            <div className="info-row">
                <h4 className="info-row__label">Type</h4>
                <div className="info-row__value" data-testid="type">
                    {getBookType(book.type)}
                </div>
            </div>

            <div className="info-row">
                <h4 className="info-row__label">Status</h4>
                <div className="info-row__value" data-testid="status">
                    {getBookStatus(book.status)}
                </div>
            </div>

            {
                book.tags.length &&
                <div className="info-row">
                    <h4 className="info-row__label">Tags</h4>
                    <div className="info-row__value" data-testid="tags">
                        <Join value={book.tags}/>
                    </div>
                </div> || null
            }

            {
                book.status !== BookStatus.ToRead && book.started.year &&
                <div className="info-row">
                    <h4 className="info-row__label">Start date</h4>
                    <div className="info-row__value" data-testid="start-date">
                        <BookDate value={book.started}/>
                    </div>
                </div> || null
            }

            {
                book.status === BookStatus.Done && book.finished.year &&
                <div className="info-row">
                    <h4 className="info-row__label">Finish date</h4>
                    <div className="info-row__value" data-testid="end-date">
                        <BookDate value={book.finished}/>
                    </div>
                </div> || null
            }
        </div>
    )
}

function getBookType(type: BookType): string {
    switch (type) {
        case BookType.Audio:
            return 'Audiobook'
        case BookType.Electronic:
            return 'Electronic book'
        case BookType.Paper:
            return 'Paper book'
    }
}

function getBookStatus(status: BookStatus): string {
    switch (status) {
        case BookStatus.InProgress:
            return 'In Progress'
        case BookStatus.Done:
            return 'Done'
        case BookStatus.ToRead:
            return 'To Read'
    }
}

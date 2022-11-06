import { BookDate as BookDateModel } from "../../../../../../common/models/book/book-date";
import { BookDate } from "../BookDate/BookDate";

export default function BookDateInterval(props: {from: BookDateModel, to: BookDateModel}) {
    const {from, to} = props;

    return (
        <div className="book-dates-interval" data-testid="book-dates-interval">
            [{
                from?.year
                    ? <BookDate value={from} />
                    : '…'
            } - {
                to?.year
                    ? <BookDate value={to} />
                    : '…'
            }]
        </div>
    )
}

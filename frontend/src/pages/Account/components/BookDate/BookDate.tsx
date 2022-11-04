import { BookDate as BookDateModel } from "../../../../common/models/book/book-date";
import { format } from "date-fns";


export function BookDate(props: {value: BookDateModel}) {
    const {value} = props;
    const {year, month, day} = value;

    const date = new Date(year ?? 1, month ? (month - 1) : 0, day ?? 1);

    return (
        <span>{format(date, 'yyyy.MM.dd')}</span>
    )
}

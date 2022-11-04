import { TimeBookProgress } from "../../../../common/models/book/progress/time-book-progress";
import { TimeProgress } from "../../../../common/models/book/progress/time-progress";

export default function BookTimeProgress(props: { value: TimeBookProgress }) {
    const {value} = props;

    return (
        <div className="book-progress--page">
            <Time value={value.done}/> from <Time value={value.total}/>
        </div>
    )
}

function Time(props: {value: TimeProgress}) {
    const {value} = props;

    const hours = value.hours.toString().padStart(2, '0');
    const minutes = value.minutes.toString().padStart(2, '0');

    return (
        <span>
            {hours}:{minutes}
        </span>
    )
}

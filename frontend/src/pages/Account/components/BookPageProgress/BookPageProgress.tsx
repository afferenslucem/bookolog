import { PageBookProgress } from "../../../../common/models/page-book-progress";

export default function BookPageProgress(props: {value: PageBookProgress}) {
    const {value} = props;

    return (
        <div className="book-progress--page">
            {value.done} from {value.total}
        </div>
    )
}

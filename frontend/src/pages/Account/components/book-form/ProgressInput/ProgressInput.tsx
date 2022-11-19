import { useFormContext } from "react-hook-form";
import { BookData } from "../../../../../common/models/book/book-data";
import { BookStatus } from "../../../../../common/models/book/book-status";
import PageProgressInput from "./PageProgressInput/PageProgressInput";
import { BookType } from "../../../../../common/models/book/book-type";
import TimeProgressInput from "./TimeProgressInput/TimeProgressInput";
import './ProgressInput.scss'

export default function ProgressInput() {
    const {watch} = useFormContext<BookData>();

    const {status, type} = watch()

    if (status !== BookStatus.InProgress) return null;

    return (
        <div data-testid="progress">
            <div className="progress__label">
                Progress
            </div>
            <div className="progress__input">
                {
                    type === BookType.Audio
                        ? <TimeProgressInput/>
                        : <PageProgressInput/>
                }
            </div>
        </div>
    )
}

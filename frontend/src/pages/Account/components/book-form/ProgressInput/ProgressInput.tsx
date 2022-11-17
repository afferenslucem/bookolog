import { useFormContext } from "react-hook-form";
import { BookData } from "../../../../../common/models/book/book-data";
import { BookStatus } from "../../../../../common/models/book/book-status";
import PageProgressInput from "./PageProgressInput/PageProgressInput";
import { BookType } from "../../../../../common/models/book/book-type";
import TimeProgressInput from "./TimeProgressInput/TimeProgressInput";

export default function ProgressInput() {
    const {watch} = useFormContext<BookData>();

    const {status, type} = watch()

    if (status !== BookStatus.InProgress) return null;

    return (
        <div data-testid="progress">
            {
                type === BookType.Audio
                    ? <TimeProgressInput/>
                    : <PageProgressInput/>
            }
        </div>
    )
}

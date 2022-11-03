import { PageBookProgress } from "./page-book-progress";
import { TimeBookProgress } from "./time-book-progress";
import { BookProgress } from "./book-progress";
import { ProgressAlgorithmType } from "./progress-algorithm-type";
import { BookType } from "./book-type";
import { Book } from "./book";

export class ProgressFactory {
    public static getProgress(bookType: BookType): BookProgress;
    public static getProgress(bookType: BookType, progressType: ProgressAlgorithmType): BookProgress;
    public static getProgress(bookType: BookType, progressType = ProgressAlgorithmType.Done): BookProgress {
        if (bookType === BookType.Audio) {
            const result = new TimeBookProgress();
            result.progressType = progressType;

            return result;
        } else {
            const result = new PageBookProgress();
            result.progressType = progressType;

            return result;
        }
    }

    public static getProgressFromBook({book}: { book: Book }): BookProgress {
        const result = ProgressFactory.getProgress(book.type, book.progressType);

        result.doneUnits = book.doneUnits;
        result.totalUnits = book.totalUnits;

        return result;
    }
}

import moment from 'moment'
export const PAPER_BOOK_TYPE = 0;
export const ELECTRONIC_BOOK_TYPE = 1;
export const AUDIO_BOOK_TYPE = 2;

export const TO_READ_STATUS = 0;
export const IN_PROGRESS_STATUS = 1;
export const DONE_STATUS = 2;

export class Book {
    // id: string
    // name: string
    // authors: string[]
    // year: number
    // status: number
    // tags: string[]
    // totalUnits: number
    // doneUnits: number
    // genre: string | optional
    // startDateYear: number
    // startDateMonth: number
    // startDateDay: number
    // endDateYear: string
    // endDateMonth: string
    // endDateDay: string
    // modifyDate: string
    // createDate: string
    // type: number
    // note: string

    constructor(obj) {
        Object.assign(this, obj);
        this.createDate = moment.utc(obj.createDate).format();
        this.modifyDate = moment.utc(obj.modifyDate).format();
        this.authors = this.authors || [];
        this.tags = this.tags || [];
    }

    get progress() {
        return this.doneUnits / this.totalUnits;
    }
}

export class BookEqualityComparer {
    getHashCode(book) {
        return book.guid;
    }

    equal(firstBook, secondsBook) {
        return firstBook.guid === secondsBook.guid;
    }
}
export const PAPER_BOOK_TYPE = 0;
export const ELECTRONIC_BOOK_TYPE = 1;
export const AUDIO_BOOK_TYPE = 2;

export const TO_READ_STATUS = 0;
export const IN_PROGRESS_STATUS = 1;
export const DONE_STATUS = 2;

export class Book {
    // guid: string
    // name: string
    // authors: string[]
    // year: number
    // status: number
    // tags: string[]
    // totalUnits: number
    // doneUnits: number
    // genre: string | optional
    // startDate: string
    // modifyDate: string
    // endDate: string
    // type: number
    // note: string

    constructor(obj) {
        Object.assign(this, obj);
    }

    get progress() {
        return this.doneUnits / this.totalUnits;
    }
}
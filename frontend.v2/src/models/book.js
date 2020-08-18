export const PAPER_BOOK = 0;
export const ELECTRONIC_BOOK = 1;
export const AUDIO_BOOK = 2;

export const TO_READ = 0;
export const IN_PROGRESS = 1;
export const DONE = 2;

export class Book {
    // name: string
    // authors: string[]
    // year: number
    // status: number
    // tags: string[]
    // totalUnits: number
    // doneUnits: number
    // genre: string | optional
    // startDate: string
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
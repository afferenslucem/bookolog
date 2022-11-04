export interface IBookDate {
    year?: number;
    month?: number;
    day?: number;
}

export class BookDate {
    year?: number;
    month?: number;
    day?: number;

    public constructor(obj?: IBookDate) {
        if (obj) {
            this.year = obj.year;
            this.month = obj.month;
            this.day = obj.day;
        }
    }
}

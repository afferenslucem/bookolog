export interface IBookDate {
    year?: number | null;
    month?: number | null;
    day?: number | null;
}

export class BookDate {
    year?: number | null;
    month?: number | null;
    day?: number | null;

    public constructor(obj?: IBookDate) {
        if (obj) {
            this.year = obj.year;
            this.month = obj.month;
            this.day = obj.day;
        }
    }
}

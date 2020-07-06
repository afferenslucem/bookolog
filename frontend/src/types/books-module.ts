export enum Status {
    toRead = 0,
    inProgress = 1,
    done = 2
}

export interface Book {
    id: number;
    name: string;
    authors: string[];
    status: Status;
    startDate?: Date;
    endDate?: Date;
}

export interface BookYearList {
    year: number;
    books: Book[];
}

export interface BookResponse {
    books: Book[];
}

export interface BooksModule {
    books: Book[];
}

export class BookUtils {
    public static groupByYear(books: Book[]): BookYearList[] {
        return null;
    }
}
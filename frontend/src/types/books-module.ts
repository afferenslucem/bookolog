export enum Status {
    toRead = 0,
    inProgress = 1,
    done = 2
}

export interface Book {
    name: string;
    authors: string[];
    status: Status;
    startDate: Date;
    endDate: Date;
}

export interface BookResponse {
    books: Book[]
}

export interface BooksModule {
    books: Book[];
}
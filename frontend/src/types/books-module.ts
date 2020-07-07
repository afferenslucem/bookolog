export enum Status {
    toRead = 0,
    inProgress = 1,
    done = 2
}

export interface BookData {
    id: number | null;
    name: string;
    authors: string[];
    status: Status | null;
    startDate?: Date | string;
    endDate?: Date | string;
    pages?: number;
    totalPages?: number;
}

export class Book implements BookData {
    id: number | null;
    name: string;
    authors: string[];
    status: Status;
    startDate?: Date | string;
    endDate?: Date | string;
    pages?: number;
    totalPages?: number;

    public constructor(book: BookData) {
        this.id = book.id;
        this.name = book.name;
        this.authors = book.authors;
        this.status = book.status || Status.toRead;
        this.startDate = book.startDate;
        this.endDate = book.endDate;
        this.pages = book.pages;
        this.totalPages = book.totalPages;
    }

    public get progressPercent(): number {
        const pages = this.pages || 0;
        const totalPages = this.totalPages || 1;

        const progress = pages / totalPages * 100;

        const result = Math.floor(progress);

        return result;
    }
}

export interface BookYearList {
    year: number;
    books: Book[];
}

export interface BookResponse {
    books: BookData[];
}

export interface BooksModule {
    books: Book[];
}

export class BookUtils {
    public static copy(book: Book): Book {
        const result = new Book(book);
        result.authors = Array.from(book.authors);

        return result;
    }
}
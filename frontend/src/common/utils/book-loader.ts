import { httpClient } from "./http-client";
import { Book } from "../models/book/book";
import { BookData } from "../models/book/book-data";

export class BookLoader {
    public getBooksInProgress(): Promise<Book[]> {
        return httpClient.get<BookData[]>('/book/inprogress')
            .then(response => response.data)
            .then(data => data.map(item => new Book(item)));
    }

    public getBooksDone(): Promise<Book[]> {
        return httpClient.get<BookData[]>('/book/done')
            .then(response => response.data)
            .then(data => data.map(item => new Book(item)));
    }

    public getBooksToRead(): Promise<Book[]> {
        return httpClient.get<BookData[]>('/book/toread')
            .then(response => response.data)
            .then(data => data.map(item => new Book(item)));
    }
}

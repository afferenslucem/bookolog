import { httpClient } from "./http-client";
import { Book } from "../models/book/book";
import { BookData } from "../models/book/book-data";

export class BookLoader {
    public getBooksInProgress(): Promise<Book[]> {
        return httpClient.get<BookData[]>('/book/inprogress')
            .then(response => response.data)
            .then(data => data.map(item => new Book(item)));
    }
}

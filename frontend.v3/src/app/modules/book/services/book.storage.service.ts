import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookStorageService {
  constructor() { }

  public async getAll(): Promise<Book[]> {
    return null;
  }

  public async restore(books: Book[]): Promise<void> {
    return null;
  }
}

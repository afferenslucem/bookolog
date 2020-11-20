import { Injectable } from '@angular/core';
import _ from 'declarray';
import { SyncService } from '../../../main/services/sync.service';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private syncService: SyncService, private storage: BookStorageService, private origin: BookOriginService) {
  }

  public async getBooks(): Promise<Book[]> {
    const data = await this.storage.getAll();

    return _(data).select(item => new Book(item)).toArray();
  }

  public async getByGuid(guid: string): Promise<Book> {
    const data = await this.storage.getByGuid(guid);

    return new Book(data);
  }

  public async getByStatus(status: BookStatus): Promise<Book[]> {
    const data = await this.storage.getAllByStatus(status);

    return _(data).select(item => new Book(item)).toArray();
  }
}

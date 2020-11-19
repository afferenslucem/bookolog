import { Injectable } from '@angular/core';
import _ from 'declarray';
import { SyncService } from '../../../main/services/sync.service';
import { Book } from '../models/book';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private syncService: SyncService, private storage: BookStorageService, private origin: BookOriginService) {
  }

  public async getBooks(): Promise<Book[]> {
    const data = await this.syncService.getData(
      () => this.storage.getAll(),
      () => this.origin.getAll(),
      books => this.storage.restore(books)
    );

    return _(data).select(item => new Book(item)).toArray();
  }

  public async getByGuid(guid: string): Promise<Book> {
    const data = await this.storage.getByGuid(guid);

    return new Book(data);
  }
}

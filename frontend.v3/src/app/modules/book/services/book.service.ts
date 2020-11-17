import { Injectable } from '@angular/core';
import { SyncService } from '../../synchronization/services/sync.service';
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
    return await this.origin.getAll();

    // return await this.syncService.getData(
    //   () => this.storage.getAll(),
    //   () => this.origin.getAll(),
    //   books => this.storage.restore(books)
    // );
  }
}

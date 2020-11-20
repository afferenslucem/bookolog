import { Injectable } from '@angular/core';
import { getLogger } from '../../../main/app.logging';
import { IndexedDbService } from '../../../main/services/indexed-db.service';
import { BookData } from '../models/book-data';
import { UUIDGenerator } from 'essents';
import _ from 'declarray';
import { BookStatus } from '../models/book-status';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  private logger = getLogger('BookStorageService');

  private readonly generator = new UUIDGenerator();
  private readonly dbName = 'bookolog.db';
  private readonly booksStore = 'BooksStore';

  constructor(private indexedDb: IndexedDbService) {
  }

  public async getAll(): Promise<BookData[]> {
    try {
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.all(this.booksStore);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getAllByStatus(status: BookStatus): Promise<BookData[]> {
    try {
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'status', status);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getByGuid(guid: string): Promise<BookData> {
    try {
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.get(this.booksStore, guid);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async saveMany(books: BookData[]): Promise<BookData[]> {
    if (books.length === 0) {
      return [];
    }

    try {
      await this.indexedDb.open(this.dbName);

      books.forEach(item => {
        if (!!item.guid) {
          item.guid = this.generator.generate();
        }
      });

      await this.indexedDb.saveMany(this.booksStore, books);

      return books;
    } finally {
      this.indexedDb.close();
    }
  }

  public async restore(books: BookData[]): Promise<void> {
    await this.clear();
    await this.saveMany(books);
  }

  public async clear(): Promise<void> {
    try {
      await this.indexedDb.open(this.dbName);
      await this.indexedDb.clear(this.booksStore);
    } finally {
      this.indexedDb.close();
    }
  }

  public async delete(guid: string): Promise<void> {
    try {
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.delete(this.booksStore, guid);
    } finally {
      this.indexedDb.close();
    }
  }

  public async update(book: BookData): Promise<BookData> {
    try {
      this.logger.debug('book update');

      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.update(this.booksStore, book);

      return book;
    } finally {
      this.indexedDb.close();
    }
  }
}

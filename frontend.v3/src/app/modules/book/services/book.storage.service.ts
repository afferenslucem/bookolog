import { Injectable } from '@angular/core';
import { getLogger } from '../../../main/app.logging';
import { IndexedDbService } from '../../../main/services/indexed-db.service';
import { PreloaderService } from '../../../main/services/preloader.service';
import { BookData } from '../models/book-data';
import { UUIDGenerator } from 'essents';
import { BookStatus } from '../models/book-status';
import { IStorage } from 'src/app/main/services/i-storage';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService implements IStorage<BookData> {
  private logger = getLogger('BookStorageService');

  private readonly generator = new UUIDGenerator();
  private readonly dbName = 'bookolog.db';
  private readonly booksStore = 'BooksStore';

  constructor(private indexedDb: IndexedDbService, private preloaderService: PreloaderService) {
  }

  public async getAll(): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.all(this.booksStore);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async count(): Promise<number> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.getCount(this.booksStore, 'guid');

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async countByStatus(status: BookStatus): Promise<number> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.getCount(this.booksStore, 'status', status);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getAllByStatus(status: BookStatus): Promise<BookData[]> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'status', status);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async getDeleted(): Promise<BookData[]> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'deleted', true);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async getShouldSync(): Promise<BookData[]> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'shouldSync', true);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async getByGuid(guid: string): Promise<BookData> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.get(this.booksStore, 'guid', guid);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async saveMany(books: BookData[]): Promise<BookData[]> {
    if (books.length === 0) {
      return [];
    }

    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      books.forEach(item => {
        if (!item.guid) {
          item.guid = this.generator.generate();
        }
      });

      await this.indexedDb.saveMany(this.booksStore, books);

      return books;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async save(book: BookData): Promise<BookData> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      if (!book.guid) {
        book.guid = this.generator.generate();
      }

      await this.indexedDb.save(this.booksStore, book);

      return book;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async updateMany(books: BookData[]): Promise<BookData[]> {
    if (books.length === 0) {
      return [];
    }

    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.updateMany(this.booksStore, books);

      return books;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async deleteMany(books: BookData[]): Promise<BookData[]> {
    if (books.length === 0) {
      return [];
    }

    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.deleteMany(this.booksStore, books.map(item => item.guid));

      return books;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async restore(books: BookData[]): Promise<void> {
    await this.clear();
    await this.saveMany(books);
  }

  public async clear(): Promise<void> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);
      await this.indexedDb.clear(this.booksStore);
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async delete(guid: string): Promise<void> {
    try {
      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.delete(this.booksStore, guid);
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async update(book: BookData): Promise<BookData> {
    try {
      this.logger.debug('book update');

      this.preloaderService.show();
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.update(this.booksStore, book);

      return book;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }
}

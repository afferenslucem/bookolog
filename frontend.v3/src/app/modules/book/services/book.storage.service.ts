import { Injectable } from '@angular/core';
import { EntityStorage } from '../../../main/services/entity.storage';
import { IndexedDbService } from '../../../main/services/indexed-db.service';
import { PreloaderService } from '../../../main/services/preloader.service';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import _ from 'declarray';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService extends EntityStorage<BookData> {
  private readonly booksStore = 'BooksStore';

  constructor(indexedDb: IndexedDbService, private preloaderService: PreloaderService, uuidGenerator: UUIDGeneratorService) {
    super('BooksStore', indexedDb, uuidGenerator);
  }

  public async getAll(): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      return await super.getAll();
    } finally {
      this.preloaderService.hide();
    }
  }

  public async saveMany(books: BookData[]): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      return await super.saveMany(books);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async clear(): Promise<void> {
    try {
      this.preloaderService.show();

      await super.clear();
    } finally {
      this.preloaderService.hide();
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

  public async getAllByYear(year: number): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      if (year != null) {
        await this.indexedDb.open(this.dbName);
        const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'endDateYear', year);
        return data.target.result;
      } else {
        const data = await this.getAll();
        const result = await _(data || []).where(item => item.endDateYear == null).promisify().toArray();
        return result;
      }
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async getAllByCollection(guid: string): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.allWithProperty(this.booksStore, 'collectionGuid', guid);

      return data.target.result;
    } finally {
      this.indexedDb.close();
      this.preloaderService.hide();
    }
  }

  public async getDeleted(): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      return await super.getDeleted();
    } finally {
      this.preloaderService.hide();
    }
  }

  public async getShouldSync(): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      return await super.getShouldSync();
    } finally {
      this.preloaderService.hide();
    }
  }

  public async getByGuid(guid: string): Promise<BookData> {
    try {
      this.preloaderService.show();

      return await super.getByGuid(guid);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async save(book: BookData): Promise<BookData> {
    try {
      this.preloaderService.show();

      return await super.save(book);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async updateMany(books: BookData[]): Promise<BookData[]> {
    try {
      this.preloaderService.show();

      return await super.updateMany(books);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async update(book: BookData): Promise<BookData> {
    try {
      this.preloaderService.show();

      return await super.update(book);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async deleteMany(guids: string[]): Promise<void> {
    try {
      this.preloaderService.show();

      await super.deleteMany(guids);
    } finally {
      this.preloaderService.hide();
    }
  }

  public async delete(guid: string): Promise<void> {
    try {
      this.preloaderService.show();

      await super.delete(guid);
    } finally {
      this.preloaderService.hide();
    }
  }
}

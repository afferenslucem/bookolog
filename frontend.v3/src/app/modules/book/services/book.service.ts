import { Injectable } from '@angular/core';
import format from 'date-fns/format';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private logger = getLogger('BookService');

  constructor(private storage: BookStorageService, private origin: BookOriginService) {
  }

  public async getAll(): Promise<Book[]> {
    const data = await this.storage.getAll();

    return _(data).select(item => new Book(item)).toArray();
  }

  public async saveOrUpdate(book: Book): Promise<Book> {
    const dto = this.convertToDTO(book);

    if (book.guid) {
      await this.storage.update(dto);
    } else {
      const saved = await this.storage.save(dto);
    }

    await this.sync();

    return new Book(dto);
  }

  public async getByGuid(guid: string): Promise<Book> {
    const data = await this.storage.getByGuid(guid);

    return new Book(data);
  }

  public async getByStatus(status: BookStatus): Promise<Book[]> {
    const data = await this.storage.getAllByStatus(status);

    return _(data)
      .where(item => !item.deleted)
      .select(item => new Book(item))
      .toArray();
  }

  public async deleteBook(book: Book): Promise<void> {
    try {
      this.logger.debug('bookDelete');

      await this.origin.delete(book.guid);
      await this.storage.delete(book.guid);
    } catch (e) {
      await this.softDelete(book);
    }
  }

  private async softDelete(book: Book): Promise<void> {
    book.deleted = true;

    const dto = this.convertToDTO(book);

    await this.storage.update(dto);
  }

  public async restore(): Promise<void> {
    await this.sync();

    await this.loadAll();
  }

  public async sync(): Promise<void> {
    const allBooks = await this.storage.getAll();

    const deletedToSync = _(allBooks).where(item => item.deleted).toArray();
    const updatedToSync = _(allBooks).where(item => item.shouldSync).toArray();

    const remoteSyncData = await this.origin.sync({
      deleteGuids: deletedToSync.map(item => item.guid),
      update: updatedToSync
    });

    const toDelete = _(remoteSyncData.delete)
      .concat(deletedToSync)
      .toArray();

    const toUpdate = _(updatedToSync)
      .select(item => {
        item.shouldSync = false;
        return item;
      })
      .concat(remoteSyncData.update)
      .toArray();

    const deleting = this.storage.deleteMany(toDelete);
    const updating = this.storage.updateMany(toUpdate);

    await Promise.all([updating, deleting]);
  }

  public async loadAll(): Promise<void> {
    const data = await this.origin.getAll();
    await this.storage.restore(data);
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

  private convertToDTO(book: Book): BookData {
    const data: BookData = {
      guid: book.guid,
      name: book.name,
      authors: Array.from(book.authors),
      year: book.year,
      status: book.status,
      tags: Array.from(book.tags),
      totalUnits: book.totalUnits,
      doneUnits: book.doneUnits,
      genre: book.genre,
      startDateYear: book.started.year,
      startDateMonth: book.started.month,
      startDateDay: book.started.day,
      endDateYear: book.finished.year,
      endDateMonth: book.finished.month,
      endDateDay: book.finished.day,
      type: book.type,
      note: book.note,
      modifyDate: this.formatDate(book.modifyDate),
      createDate: this.formatDate(book.createDate),
      deleted: book.deleted,
      shouldSync: book.shouldSync,
    };

    return data;
  }

  private formatDate(date: Date): string {
    const temp = format(date, 'yyyy-MM-dd HH:mm:ss');

    return `${temp.slice(0, 10)}T${temp.slice(11, 19)}`;
  }
 }

import { Injectable } from '@angular/core';
import format from "date-fns/format";
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { SyncService } from '../../../main/services/sync.service';
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

  constructor(private syncService: SyncService, private storage: BookStorageService, private origin: BookOriginService) {
  }

  public async getAll(): Promise<Book[]> {
    const data = await this.storage.getAll();

    return _(data).select(item => new Book(item)).toArray();
  }

  public async saveOrUpdate(book: Book): Promise<Book> {
    const dto = this.convertToDTO(book);

    if (book.guid) {
      await this.storage.update(dto);

      return book;
    } else {
      const saved = await this.storage.save(dto);

      return new Book(saved);
    }
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
    const data = await this.origin.getAll();
    await this.storage.restore(data);
  }

  public async sync(): Promise<void> {
    const allBooks = await this.storage.getAll();

    const deletedToSync = _(allBooks).where(item => item.deleted).toArray();
    const updatedToSync = _(allBooks).where(item => item.shouldSync).toArray();

    const remoteSyncData = await this.origin.sync({
      localDeleted: deletedToSync,
      localUpdated: updatedToSync
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
      modifyDate: format(book.modifyDate, 'yyyy-MM-dd HH:mm:ss'),
      createDate: format(book.createDate, 'yyyy-MM-dd HH:mm:ss'),
      deleted: book.deleted,
      shouldSync: book.shouldSync,
    };

    return data;
  }
 }

import { Injectable } from '@angular/core';
import format from 'date-fns/format';
import _ from 'declarray';
import { EntityService } from 'src/app/main/services/entity.service';
import { getLogger } from '../../../main/app.logging';
import { NotificationService } from '../../notification/services/notification.service';
import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends EntityService {
  private logger = getLogger('BookService');

  constructor(private storage: BookStorageService,
              private origin: BookOriginService,
              private notificationService: NotificationService,
  ) {
    super();
  }

  public async getAll(): Promise<Book[]> {
    const data = await this.storage.getAll();

    return _(data).select(item => new Book(item)).toArray();
  }

  public async getAllCount(): Promise<number> {
    const data = await this.storage.count();

    return data;
  }

  public async getCountByStatus(status: BookStatus): Promise<number> {
    const data = await this.storage.countByStatus(status);

    return data;
  }

  public async saveOrUpdate(book: Book): Promise<Book> {
    book.shouldSync = true;
    const dto = this.convertToDTO(book);

    if (book.guid) {
      await this.storage.update(dto);
    } else {
      await this.storage.save(dto);
    }

    try {
      await this.sync();
    } catch (e) {
      this.logger.warn('error sync', e);
      this.notificationService.createWarningNotification('Книга сохранена локально');
    }

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
      this.notificationService.createWarningNotification('Книга удалена локально');
    }
  }

  public async softDelete(book: Book): Promise<void> {
    book.deleted = true;

    const dto = this.convertToDTO(book);

    await this.storage.update(dto);
  }

  public async restore(): Promise<void> {
    await this.sync();

    await this.loadAll();
  }

  public async sync(): Promise<void> {
    try {
      await this.genericSync(this.storage, this.origin);
    } catch (e) {
      this.logger.error('Could not sync', e);
      throw e;
    }
  }

  public async loadAll(): Promise<void> {
    try {
      const data = await this.origin.getAll();
      await this.storage.restore(data);
    } catch (e) {
      this.logger.error('Could not load all books', e);
    }
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

  public convertToDTO(book: Book): BookData {
    const data: BookData = {
      guid: book.guid,
      name: book.name,
      authors: book.authors ? Array.from(book.authors) : [],
      year: book.year,
      status: book.status,
      tags: book.tags ? Array.from(book.tags) : [],
      totalUnits: book.totalUnits,
      doneUnits: book.doneUnits,
      genre: book.genre,
      startDateYear: book.started?.year,
      startDateMonth: book.started?.month,
      startDateDay: book.started?.day,
      endDateYear: book.finished?.year,
      endDateMonth: book.finished?.month,
      endDateDay: book.finished?.day,
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
    const temp = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

    return `${temp.slice(0, 10)}T${temp.slice(11, 19)}`;
  }
}

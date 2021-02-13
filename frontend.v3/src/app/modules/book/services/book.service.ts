import {Injectable} from '@angular/core';
import _ from 'declarray';
import {EntityService} from 'src/app/main/services/entity.service';
import {getConsoleLogger} from '../../../main/app.logging';
import {NotificationService} from '../../notification/services/notification.service';
import {Book} from '../models/book';
import {BookData} from '../models/book-data';
import {BookStatus} from '../models/book-status';
import {BookOriginService} from './book.origin.service';
import {BookStorageService} from './book.storage.service';
import {ProgressAlgorithmType} from '../models/progress-algorithm-type';

@Injectable({
  providedIn: 'root',
})
export class BookService extends EntityService<BookData, Book> {
  private logger = getConsoleLogger('BookService');

  private typedStorage: BookStorageService;

  constructor(storage: BookStorageService,
              origin: BookOriginService,
              private notificationService: NotificationService,
  ) {
    super(storage, origin);

    this.typedStorage = storage;
  }

  public async getCountByStatus(status: BookStatus): Promise<number> {
    const data = await this.typedStorage.countByStatus(status);
    return data;
  }

  public async saveOrUpdate(book: Book): Promise<Book> {
    try {
      book = await super.saveOrUpdate(book);
    } catch (e) {
      this.logger.warn('error sync', e);
      this.notificationService.createWarningNotification('Книга сохранена локально');
    }

    return book;
  }

  public async deleteBooksFromCollection(guid: string): Promise<void> {
    const books = await this.getBySeries(guid);

    books.forEach(item => {
      item.collectionGuid = null;
      item.collectionOrder = null;
    });

    await this.saveOrUpdateMany(books);
  }

  public async getByStatus(status: BookStatus): Promise<Book[]> {
    const data = await this.typedStorage.getAllByStatus(status);

    return _(data)
      .where(item => !item.deleted)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async getByYear(year: number): Promise<Book[]> {
    const data = await this.typedStorage.getAllByYear(year);

    return _(data)
      .where(item => item.status === BookStatus.Done)
      .orderByDescending(item => item.endDateMonth || -1)
      .thenByDescending(item => item.endDateDay || -1)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async getBySeries(guid: string): Promise<Book[]> {
    const data = await this.typedStorage.getAllBySeries(guid);

    return _(data)
      .where(item => !item.deleted)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async delete(book: Book): Promise<void> {
    try {
      await super.delete(book);
    } catch (e) {
      this.notificationService.createWarningNotification('Книга удалена локально');
    }
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
      collectionGuid: book.collection?.guid || book.collectionGuid,
      collectionOrder: book.collectionOrder,
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
      deleted: book.deleted || 0,
      shouldSync: book.shouldSync || 0,
      progressType: book.progressType
    };

    return data;
  }

  public convertFromDTO(data: BookData): Book {
    if (data.progressType == null) {
      data.progressType = ProgressAlgorithmType.Done;
    }

    return new Book(data);
  }
}

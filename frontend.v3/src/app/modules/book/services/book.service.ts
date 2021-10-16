import { Injectable } from '@angular/core';
import _ from 'declarray';
import { EntityService } from 'src/app/main/services/entity.service';
import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';
import { flatten } from '@angular/compiler';
import { EntityValidationError } from '../../../main/models/errors/entity-validation-error';
import { BookValidationChain } from '../utils/validation/book-validation-chain';

@Injectable({
  providedIn: 'root',
})
export class BookService extends EntityService<BookData, Book> {
  private validateEntityChain = new BookValidationChain();

  private typedStorage: BookStorageService;
  private typedOrigin: BookOriginService;

  constructor(storage: BookStorageService, origin: BookOriginService) {
    super(storage, origin);

    this.typedStorage = storage;
    this.typedOrigin = origin;
  }

  public async getCountByStatus(status: BookStatus): Promise<number> {
    const data = await this.typedStorage.countByStatus(status);
    return data;
  }

  public async save(book: Book): Promise<Book> {
    this.validate(book);

    return super.save(book);
  }

  public async update(book: Book): Promise<Book> {
    this.validate(book);

    return super.update(book);
  }

  public async saveRereading(book: Book): Promise<Book> {
    const original = await this.getByGuid(book.rereadingBookGuid);

    if (original.rereadingBookGuid) {
      book.rereadingBookGuid = original.rereadingBookGuid;
    }

    book = await this.save(book);

    original.rereadedBy.push(book.guid);
    await this.update(original);

    return book;
  }

  public async deleteBooksFromCollection(guid: string): Promise<void> {
    const books = await this.getByCollection(guid);

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
      .where(item => !item.deleted)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async getByCollection(guid: string): Promise<Book[]> {
    const data = await this.typedStorage.getAllByCollection(guid);

    return _(data)
      .where(item => !item.deleted)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async getAllReadings(guid: string): Promise<Book[]> {
    const first = await this.findFirstReadingOfBook(guid);

    const rereadings = await this.findAllRereadingsOfBook(first.guid);

    return _(rereadings).prepend(first).toArray();
  }

  public async delete(book: Book): Promise<void> {
    const rereadings = await this.typedStorage.getAllRereadings(book.guid);

    if (rereadings?.length) {
      const updated = this.changeRereadingHierarchy(rereadings);
      await this.saveOrUpdateMany(this.convertFromDTOArray(updated));
    }

    await super.delete(book);
  }

  public changeRereadingHierarchy(bookDates: BookData[]): BookData[] {
    let books = _(bookDates);

    books = books
      .orderBy(item => item.endDateYear)
      .thenBy(item => item.endDateMonth || 12)
      .thenBy(item => item.endDateDay || 32);

    const youngest = books.first();
    youngest.rereadingBookGuid = null;

    books
      .skip(1)
      .select(item => {
        item.rereadingBookGuid = youngest.guid;
        return item;
      })
      .toArray();

    return books.toArray();
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
      progressType: book.progressType,
      rereadingBookGuid: book.rereadingBookGuid,
      rereadedBy: book.rereadedBy,
    };

    return data;
  }

  public convertFromDTO(data: BookData): Book {
    return new Book(data);
  }

  private validate(book: Book): void {
    const errors = this.validateEntityChain.validate(book);

    if (errors) {
      throw new EntityValidationError(errors);
    }
  }

  private async findFirstReadingOfBook(guid: string): Promise<Book> {
    const result = await this.getByGuid(guid);

    if (result.rereadingBookGuid) {
      return await this.findFirstReadingOfBook(result.rereadingBookGuid);
    } else {
      return result;
    }
  }

  private async findAllRereadingsOfBook(guid: string): Promise<Book[]> {
    const rereadingsDTO = await this.typedStorage.getAllRereadings(guid);
    const rereadings = this.convertFromDTOArray(rereadingsDTO);

    if (rereadings.length === 0) {
      return rereadings;
    } else {
      const requests = rereadings.map(item => this.findAllRereadingsOfBook(item.guid));

      const resultDTO = await Promise.all(requests);
      const result = _(resultDTO).selectMany(flatten);

      return _(rereadings).concat(result).toArray();
    }
  }
}

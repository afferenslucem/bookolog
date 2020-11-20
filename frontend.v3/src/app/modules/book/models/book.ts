import { BookData } from './book-data';
import { BookDate } from './book-date';
import { BookStatus } from './book-status';
import { BookType } from './book-type';
import format from 'date-fns/format';

export class Book {
  public guid: string;
  public name: string;
  public authors: string[];
  public year?: number;
  public status: BookStatus;
  public tags: string[];
  public totalUnits: number;
  public doneUnits: number;
  public genre?: string;
  public started: BookDate;
  public startDate?: Date;
  public finished: BookDate;
  public endDate?: Date;
  public modifyDate: Date;
  public createDate: Date;
  public type: BookType;
  public note?: string;
  public deleted?: boolean;
  public shouldSync?: boolean;

  public constructor(data: BookData) {
    this.guid = data.guid;
    this.name = data.name;
    this.authors = data.authors || [];
    this.year = data.year;
    this.status = data.status;
    this.tags = data.tags || [];
    this.totalUnits = data.totalUnits || 0;
    this.doneUnits = data.doneUnits || 0;
    this.genre = data.genre;
    this.started = {
      year: data.startDateYear,
      month: data.startDateMonth,
      day: data.startDateDay,
    };
    this.startDate = this.getDate(data.startDate, this.started);
    this.finished = {
      year: data.endDateYear,
      month: data.endDateMonth,
      day: data.endDateDay,
    };
    this.endDate = this.getDate(data.endDate, this.finished);
    this.modifyDate = new Date(data.modifyDate);
    this.createDate = new Date(data.createDate);
    this.type = data.type;
    this.note = data.note;
    this.deleted = data.deleted;
    this.shouldSync = data.shouldSync;
  }

  private getDate(date: string | Date, bDate: BookDate): Date {
    if (!!date) {
      return new Date(date);
    } else if (bDate.day || bDate.month || bDate.year) {
      const month = bDate.month ? bDate.month - 1 : 0;
      return new Date(bDate.year, month, bDate.day || 1);
    } else {
      return null;
    }
  }

  public convertToDTO(): BookData {
    const data: BookData = {
      guid: this.guid,
      name: this.name,
      authors: Array.from(this.authors),
      year: this.year,
      status: this.status,
      tags: Array.from(this.tags),
      totalUnits: this.totalUnits,
      doneUnits: this.doneUnits,
      genre: this.genre,
      startDateYear: this.started.year,
      startDateMonth: this.started.month,
      startDateDay: this.started.day,
      endDateYear: this.finished.year,
      endDateMonth: this.finished.month,
      endDateDay: this.finished.day,
      type: this.type,
      note: this.note,
      modifyDate: format(this.modifyDate, 'yyyy-MM-dd HH:mm:ss'),
      createDate: format(this.createDate, 'yyyy-MM-dd HH:mm:ss'),
      deleted: this.deleted,
      shouldSync: this.shouldSync,
    };

    return data;
  }
}

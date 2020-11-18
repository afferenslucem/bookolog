import { BookData } from './book-data';
import { BookDate } from './book-date';
import { BookStatus } from './book-status';
import { BookType } from './book-type';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';

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
  public finished: BookDate;
  public modifyDate: Date;
  public createDate: Date;
  public type: BookType;
  public note?: string;

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
    this.finished = {
      year: data.endDateYear,
      month: data.endDateMonth,
      day: data.endDateDay,
    };
    this.modifyDate = new Date(data.modifyDate);
    this.createDate = new Date(data.createDate);
    this.type = data.type;
    this.note = data.note;
  }
}

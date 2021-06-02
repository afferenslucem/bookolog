import { Entity } from '../../../main/models/entity';
import { Collection } from '../../collection/models/collection';
import { BookData } from './book-data';
import { BookDate } from './book-date';
import { BookStatus } from './book-status';
import { BookType } from './book-type';
import { ProgressAlgorithmType } from './progress-algorithm-type';

export class Book extends Entity {
  public name: string;
  public authors: string[];
  public year?: number;
  public status: BookStatus;
  public tags: string[];
  public totalUnits: number;
  public doneUnits: number;
  public genre?: string;
  public collection?: Collection = null;
  public collectionGuid?: string;
  public collectionOrder?: number;
  public started: BookDate;
  public startDate?: Date;
  public finished: BookDate;
  public endDate?: Date;
  public type: BookType;
  public note?: string;
  public progressType: ProgressAlgorithmType;
  public rereadingBookGuid?: string;
  public rereadedBy: string[];

  public constructor(data: BookData) {
    super(data);

    this.name = data.name;
    this.authors = data.authors || [];
    this.year = data.year;
    this.status = data.status;
    this.tags = data.tags || [];
    this.totalUnits = data.totalUnits || 0;
    this.doneUnits = data.doneUnits || 0;
    this.genre = data.genre;
    this.collectionGuid = data.collectionGuid;
    this.collectionOrder = data.collectionOrder;
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
    this.type = data.type;
    this.note = data.note;
    this.progressType = data.progressType || ProgressAlgorithmType.Done;
    this.rereadingBookGuid = data.rereadingBookGuid || null;
    this.rereadedBy = data.rereadedBy || [];
  }

  public get done(): number {
    if (this.totalUnits == null || this.doneUnits == null) {
      return null;
    }
    if (this.progressType === ProgressAlgorithmType.Left) {
      return this.totalUnits - this.doneUnits;
    } else {
      return this.doneUnits;
    }
  }

  public set done(v: number) {
    if (this.progressType === ProgressAlgorithmType.Left) {
      this.doneUnits = this.totalUnits - v;
    } else {
      this.doneUnits = v;
    }
  }

  public get progressPercents(): number {
    if (this.totalUnits && this.doneUnits) {
      return Math.floor((this.doneUnits / this.totalUnits) * 100);
    } else {
      return 0;
    }
  }

  public toString(): string {
    return this.authors.concat([this.name]).join('|');
  }

  private getDate(date: string | Date, bDate: BookDate): Date {
    if (date) {
      return new Date(date);
    } else if (bDate.day || bDate.month || bDate.year) {
      const month = bDate.month ? bDate.month - 1 : 0;
      return new Date(bDate.year, month, bDate.day || 1);
    } else {
      return null;
    }
  }
}

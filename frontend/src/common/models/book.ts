import { BookDate } from "./book-date";
import { BookStatus } from "./book-status";
import { BookType } from "./book-type";
import { ProgressAlgorithmType } from "./progress-algorithm-type";
import { Collection } from "./collection";
import { BookProgress } from "./book-progress";
import { ProgressFactory } from "./progress-factory";
import { BookData } from "./book-data";

export class Book {
    public guid: string;

    public modifyDate: Date;
    public createDate: Date;
    public name: string;
    public authors: string[];
    public year?: number;
    public status: BookStatus;
    public tags: string[];
    public genre?: string;
    public collection?: Collection;
    public collectionGuid?: string;
    public collectionOrder?: number;
    public started: BookDate;
    public startDate?: Date;
    public finished: BookDate;
    public endDate?: Date;
    public type: BookType;
    public note?: string;
    public rereadingBookGuid?: string;
    public rereadedBy: string[];

    public progress: BookProgress;

    public constructor(data: BookData) {
        this.guid = data.guid;

        this.modifyDate = new Date(data.modifyDate);
        this.createDate = new Date(data.createDate);

        this.name = data.name;
        this.authors = data.authors || [];
        this.year = data.year;
        this.status = data.status;
        this.tags = data.tags || [];
        this.progress = ProgressFactory.getProgress(data.type, data.progressType || ProgressAlgorithmType.Done);
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
        this.rereadingBookGuid = data.rereadingBookGuid;
        this.rereadedBy = data.rereadedBy || [];
    }

    public get doneUnits(): number {
        return this.progress.doneUnits;
    }

    public set doneUnits(v: number) {
        this.progress.doneUnits = v;
    }

    public get doneNumeric(): number {
        return this.progress.doneNumeric;
    }

    public get totalUnits(): number {
        return this.progress.totalUnits;
    }

    public set totalUnits(v: number) {
        this.progress.totalUnits = v;
    }

    public get progressPercents(): number {
        return this.progress.progressPercent;
    }

    public get progressType(): ProgressAlgorithmType {
        return this.progress.progressType;
    }

    public set progressType(v: ProgressAlgorithmType) {
        this.progress.progressType = v;
    }

    public toString(): string {
        return this.authors.concat([this.name]).join('|');
    }

    private getDate(date: string | Date | undefined, bDate: BookDate): Date {
        if (date) {
            return new Date(date);
        } else if (bDate.day || bDate.month || bDate.year) {
            const month = bDate.month ? bDate.month - 1 : 0;
            return new Date(bDate.year!, month, bDate.day || 1);
        } else {
            return null!;
        }
    }
}

import { BookDate } from "./book-date";
import { BookStatus } from "./book-status";
import { BookType } from "./book-type";
import { ProgressAlgorithmType } from "./progress/progress-algorithm-type";
import { Collection } from "./collection";
import { BookProgress } from "./progress/book-progress";
import { ProgressFactory } from "./progress/progress-factory";
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
        this.year = data.year!;
        this.status = data.status;
        this.tags = data.tags || [];
        this.progress = ProgressFactory.getProgress(data.type, data.progressType || ProgressAlgorithmType.Done);
        this.totalUnits = data.totalUnits || 0;
        this.doneUnits = data.doneUnits || 0;
        this.genre = data.genre!;
        this.collectionGuid = data.collectionGuid;
        this.collectionOrder = data.collectionOrder;
        this.started = {
            year: data.startDateYear,
            month: data.startDateMonth,
            day: data.startDateDay,
        };
        this.startDate = this.getDate(this.started);
        this.finished = {
            year: data.endDateYear,
            month: data.endDateMonth,
            day: data.endDateDay,
        };
        this.endDate = this.getDate(this.finished);
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

    private getDate(bDate: BookDate): Date {
        if (bDate.day || bDate.month || bDate.year) {
            const month = bDate.month ? bDate.month - 1 : 0;
            return new Date(bDate.year!, month, bDate.day || 1);
        } else {
            return null!;
        }
    }

    public convertToDTO(): BookData {
        const book = this;

        const data: BookData = {
            createDate: book.modifyDate,
            modifyDate: book.createDate,
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
            progressType: book.progressType,
            rereadingBookGuid: book.rereadingBookGuid,
            rereadedBy: book.rereadedBy
        };

        return data;
    }
}

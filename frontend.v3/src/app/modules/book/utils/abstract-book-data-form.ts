import { BookStatus } from '../models/book-status';
import { BookType } from '../models/book-type';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { BookDataForm } from './book-data-form';
import { FormGroup } from '@angular/forms';
import { Book } from '../models/book';
import { Router } from '@angular/router';
import { DateUtils } from '../../../main/utils/date-utils';
import { CollectionService } from '../../collection/services/collection.service';
import { ProgressAlgorithmService } from '../services/progress-algorithm.service';
import { BookFormValue } from '../models/book-form-value';
import { ProgressFactory } from './progress/progress-factory';

export abstract class AbstractBookDataForm {
  public BookType: typeof BookType = BookType;
  public BookStatus: typeof BookStatus = BookStatus;
  public ProgressAlgorithm: typeof ProgressAlgorithmType = ProgressAlgorithmType;
  public bookForm: BookDataForm = null;

  protected constructor(
    protected router: Router,
    private collectionService: CollectionService,
    protected progressAlgorithmService: ProgressAlgorithmService,
  ) {}

  public get status(): BookStatus {
    return this.bookForm.status;
  }

  public get type(): BookType {
    return this.bookForm.type;
  }

  public get progressAlgorithm(): ProgressAlgorithmType {
    return this.bookForm.progressType;
  }

  public get genre(): string {
    return this.bookForm.genre;
  }

  public get progressAlgorithmPreference(): ProgressAlgorithmType {
    return this.progressAlgorithmService.getAlgorithm(this.type);
  }

  public set progressAlgorithmPreference(v: ProgressAlgorithmType) {
    this.progressAlgorithmService.setAlgorithm(this.type, v);
  }

  public get form(): FormGroup {
    return this.bookForm.nativeForm;
  }

  public get book(): Book {
    return this.bookForm.snapshot;
  }

  public get value(): Book {
    const data = this.readValue();

    data.modifyDate = DateUtils.nowUTC;

    if (!data.createDate) {
      data.createDate = DateUtils.nowUTC;
    }

    return data;
  }

  private readValue(): Book {
    const data = this.form.value as BookFormValue;

    const book = this.book;

    book.name = data.name;
    book.authors = data.authors;
    book.year = data.year;
    book.status = data.status;
    book.tags = data.tags || [];
    book.progress = ProgressFactory.getProgress(data.type, data.progressType);
    book.totalNative = data.total;
    book.doneNative = data.done;
    book.genre = data.genre;
    book.collectionGuid = data.collectionGuid;
    book.collectionOrder = data.collectionOrder;
    book.started = data.started;
    book.finished = data.finished;
    book.type = data.type;
    book.note = data.note;

    return book;
  }

  public async redirectToList(): Promise<void> {
    switch (this.bookForm.status) {
      case BookStatus.ToRead: {
        await this.router.navigate(['to-read'], { replaceUrl: true });
        return;
      }
      case BookStatus.Done: {
        await this.router.navigate(['done'], { replaceUrl: true });
        return;
      }
      case BookStatus.InProgress: {
        await this.router.navigate(['in-progress'], { replaceUrl: true });
        return;
      }
    }
  }

  public async touchCollectionIfExists(book: Book): Promise<void> {
    if (book.collectionGuid) {
      await this.collectionService.updateModifyTime(book.collectionGuid);
    }
  }

  public abstract processBook(book: Book): Promise<Book>;

  protected onTypeChange(type: BookType): void {
    this.bookForm.progressType = this.progressAlgorithmPreference;

    if (Number(type) === BookType.Audio) {
      this.bookForm.totalControl.setValue({
        hours: null,
        minutes: null,
      });
      this.bookForm.doneControl.setValue({
        hours: null,
        minutes: null,
      });
    } else {
      this.bookForm.totalControl.setValue(null);
      this.bookForm.doneControl.setValue(null);
    }
  }
}

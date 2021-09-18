import { BookStatus } from '../models/book-status';
import { BookType } from '../models/book-type';
import { Book } from '../models/book';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { BookDate } from '../models/book-date';
import { Observable } from 'rxjs';
import { AbstractForm } from '../../../main/utils/abstract-form';
import { TimeProgress } from '../models/time-progress';

const defaultValue: any = {
  guid: '',
  name: '',
  status: BookStatus.ToRead,
  type: BookType.Paper,
  year: null,
  genre: '',
  collectionGuid: null,
  authors: [],
  tags: [],
  note: '',
  modifyDate: '',
  createDate: '',
  done: null,
  total: null,
  endDateYear: null,
  endDateMonth: null,
  endDateDay: null,
  startDateYear: null,
  startDateMonth: null,
  startDateDay: null,
  rereadingBookGuid: null,
  rereadedBy: [],
};

export class BookDataForm extends AbstractForm<Book> {
  public snapshot: Book;

  public constructor(book?: Book) {
    super(null);

    this.snapshot = book || new Book(defaultValue);
  }

  public get statusControl(): AbstractControl {
    return this.form.get('status');
  }

  public get status(): BookStatus {
    return Number(this.statusControl.value);
  }

  public set status(v: BookStatus) {
    this.statusControl.setValue(v);
  }

  public get statusChanges(): Observable<BookStatus> {
    return this.statusControl.valueChanges;
  }

  public get collectionGuid(): string {
    return this.form.get('collectionGuid').value;
  }

  public get genreControl(): AbstractControl {
    return this.form.get('genre');
  }

  public get genre(): string {
    return this.form.get('genre').value;
  }

  public get genreChanges(): Observable<string> {
    return this.genreControl.valueChanges;
  }

  public get startedControl(): AbstractControl {
    return this.form.get('started');
  }

  public get started(): BookDate {
    return this.startedControl.value;
  }

  public set started(v: BookDate) {
    this.startedControl.setValue(v);
  }

  public get finishedControl(): AbstractControl {
    return this.form.get('finished');
  }

  public get finished(): BookDate {
    return this.finishedControl.value;
  }

  public set finished(v: BookDate) {
    this.finishedControl.setValue(v);
  }

  public get doneControl(): AbstractControl {
    return this.form.get('done');
  }

  public get done(): number | TimeProgress {
    return this.doneControl.value;
  }

  public set done(v: number | TimeProgress) {
    this.doneControl.setValue(v);
  }

  public get totalControl(): AbstractControl {
    return this.form.get('total');
  }

  public get total(): number | TimeProgress {
    return this.totalControl.value;
  }

  public set total(v: number | TimeProgress) {
    this.totalControl.setValue(v);
  }

  public get typeControl(): AbstractControl {
    return this.form.get('type');
  }

  public get type(): BookType {
    return this.typeControl.value;
  }

  public set type(v: BookType) {
    this.typeControl.setValue(v);
  }

  public get typeChanges(): Observable<BookType> {
    return this.typeControl.valueChanges;
  }

  public get progressTypeControl(): AbstractControl {
    return this.form.get('progressType');
  }

  public get progressType(): ProgressAlgorithmType {
    return this.progressTypeControl.value;
  }

  public set progressType(v: ProgressAlgorithmType) {
    this.progressTypeControl.setValue(v);
  }

  public get progressTypeChanges(): Observable<ProgressAlgorithmType> {
    return this.progressTypeControl.valueChanges;
  }

  public build(): void {
    this.formFromBook(this.snapshot);
  }

  private formFromBook(book: Book): void {
    this.form = new FormBuilder().group({
      name: new FormControl(book.name, [Validators.required]),
      year: new FormControl(book.year),
      genre: new FormControl(book.genre),
      collectionGuid: new FormControl(book.collectionGuid),
      collectionOrder: new FormControl(book.collectionOrder),
      status: new FormControl(book.status),
      type: new FormControl(book.type),
      started: new FormControl(book.started),
      finished: new FormControl(book.finished),
      done: new FormControl(book.doneNative || null),
      total: new FormControl(book.totalNative || null),
      authors: new FormControl(book.authors),
      tags: new FormControl(book.tags),
      note: new FormControl(book.note),
      progressType: new FormControl(this.snapshot.progressType),
    });
  }
}

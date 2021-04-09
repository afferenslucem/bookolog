import {BookData} from '../models/book-data';
import {BookStatus} from '../models/book-status';
import {BookType} from '../models/book-type';
import {Book} from '../models/book';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgressAlgorithmType} from '../models/progress-algorithm-type';
import {ProgressAlgorithmSolver} from './progress-algorithm-solver';
import {BookDate} from '../models/book-date';

const defaultValue: BookData = {
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
  doneUnits: null,
  totalUnits: null,
  endDateYear: null,
  endDateMonth: null,
  endDateDay: null,
  startDateYear: null,
  startDateMonth: null,
  startDateDay: null,
  rereadingBookGuid: null,
  rereadedBy: [],
};

export class BookDataForm {
  public snapshot: Book;
  public form: FormGroup = null;

  public constructor(book?: Book) {
    this.snapshot = book || new Book(defaultValue);

    this.formFromBook(this.snapshot);
  }

  public registerOnTypeChange(callback: (type: BookType) => void): void {
    this.form.get('type').valueChanges.subscribe(callback);
  }

  public registerOnStatusChange(callback: (status: BookStatus) => void): void {
    this.form.get('status').valueChanges.subscribe(callback);
  }

  public registerOnProgressType(callback: (type: ProgressAlgorithmType) => void): void {
    this.form.get('progressType').valueChanges.subscribe(callback);
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
      doneUnits: new FormControl(book.done || null),
      totalUnits: new FormControl(book.totalUnits || null),
      authors: new FormControl(book.authors),
      tags: new FormControl(book.tags),
      note: new FormControl(book.note),
      progressType: new FormControl(this.snapshot.progressType || this.progressAlgorithmPreference || ProgressAlgorithmType.Done),
    });
  }

  public get status(): BookStatus {
    return this.form.get('status').value;
  }

  public set status(v: BookStatus) {
    this.form.get('status').setValue(v);
  }

  public get series(): string {
    return this.form.get('series').value;
  }

  public get genre(): string {
    return this.form.get('genre').value;
  }

  public set started(v: BookDate) {
    this.form.get('started').setValue(v);
  }

  public set finished(v: BookDate) {
    this.form.get('finished').setValue(v);
  }

  public set doneUnits(v: BookDate) {
    this.form.get('doneUnits').setValue(v);
  }

  public get totalUnits(): BookDate {
    return this.form.get('totalUnits').value;
  }

  public set totalUnits(v: BookDate) {
    this.form.get('totalUnits').setValue(v);
  }

  public get type(): BookType {
    return this.form.get('type').value;
  }

  public get progressType(): ProgressAlgorithmType {
    return this.form.get('progressType').value;
  }

  public set progressType(v: ProgressAlgorithmType) {
    this.form.get('progressType').setValue(v);
  }

  private get progressAlgorithmPreference(): ProgressAlgorithmType {
    return ProgressAlgorithmSolver.getAlgorithm(this.type);
  }
}

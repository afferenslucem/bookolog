import {BookData} from '../models/book-data';
import {BookStatus} from '../models/book-status';
import {BookType} from '../models/book-type';
import {Book} from '../models/book';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ProgressAlgorithmType} from '../models/progress-algorithm-type';
import {ProgressAlgorithmSolver} from './progress-algorithm-solver';
import {BookDate} from '../models/book-date';
import { Observable } from 'rxjs';

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

  public build(): void {
    this.formFromBook(this.snapshot);
  }

  public get statusControl(): AbstractControl {
    return this.form.get('status');
  }
  public get status(): BookStatus {
    return this.statusControl.value;
  }
  public set status(v: BookStatus) {
    this.form.get('status').setValue(v);
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

  public set started(v: BookDate) {
    this.form.get('started').setValue(v);
  }

  public set finished(v: BookDate) {
    this.form.get('finished').setValue(v);
  }

  public set doneUnits(v: number) {
    this.form.get('doneUnits').setValue(v);
  }

  public get totalUnits(): number {
    return this.form.get('totalUnits').value;
  }

  public set totalUnits(v: number) {
    this.form.get('totalUnits').setValue(v);
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

  private get progressAlgorithmPreference(): ProgressAlgorithmType {
    return ProgressAlgorithmSolver.getAlgorithm(this.type);
  }
}

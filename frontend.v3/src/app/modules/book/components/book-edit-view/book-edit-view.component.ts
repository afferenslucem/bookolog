import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getConsoleLogger } from '../../../../main/app.logging';
import { Action } from '../../../../main/resolvers/action.resolver';
import { DateUtils } from '../../../../main/utils/date-utils';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { Collection } from '../../../collection/models/collection';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookData } from '../../models/book-data';
import { BookDate } from '../../models/book-date';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { Location } from '@angular/common';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

@Component({
  selector: 'app-book-edit-view',
  templateUrl: './book-edit-view.component.html',
  styleUrls: ['./book-edit-view.component.scss'],
})
export class BookEditViewComponent implements OnInit {
  public book: Book;
  public BookType: typeof BookType = BookType;
  public BookStatus: typeof BookStatus = BookStatus;
  public ProgressAlgorithm: typeof ProgressAlgorithmType = ProgressAlgorithmType;
  public form: FormGroup = null;
  public authors: string[] = [];
  public tags: string[] = [];
  private logger = getConsoleLogger('BookEditViewComponent');
  private action: Action;

  private defaultValue: BookData = {
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
  };

  private _filteredGenres: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    private location: Location,
    private router: Router,
  ) {
    activatedRoute.data.subscribe(data => {
      this.book = data.book || new Book(this.defaultValue);

      if (data.status) {
        this.book.status = data.status;
      }

      this.formFromBook(this.book);

      this.readAutocompleteData(data.allBooks, data.series);

      this.readAction(data.action);
    });
  }

  private _genres: string[] = [];

  public get genres(): Observable<string[]> {
    return this._filteredGenres;
  }

  private _series: Collection[] = [];

  public get series(): string {
    return this.form.get('series').value;
  }

  public get allSeries(): Collection[] {
    return this._series;
  }

  public get status(): BookStatus {
    return this.form.get('status').value;
  }

  public get type(): BookType {
    return this.form.get('type').value;
  }

  public get genre(): string {
    return this.form.get('genre').value;
  }

  public get progressAlgorithm(): ProgressAlgorithmType {
    return this.form.get('progressType').value;
  }

  public get progressAlgorithmPreference(): ProgressAlgorithmType {
    return localStorage.getItem('progressAlgorithmPreference') as ProgressAlgorithmType;
  }

  public set progressAlgorithmPreference(v: ProgressAlgorithmType) {
    localStorage.setItem('progressAlgorithmPreference', v);
  }

  public ngOnInit(): void {
  }

  public async submit(): Promise<void> {
    try {
      const data = Object.assign(this.book, this.form.value) as Book;

      if (data.doneUnits) {
        data.done = data.doneUnits;
      }

      data.modifyDate = DateUtils.nowUTC;

      if (!data.createDate) {
        data.createDate = DateUtils.nowUTC;
      }

      await this.bookService.saveOrUpdate(data);

      if (this.action === Action.Create) {
        await this.redirect();
      } else {
        this.location.back();
      }
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
        autoclose: false,
      });
    }
  }

  private async redirect(): Promise<void> {
    switch (this.book.status) {
      case BookStatus.ToRead: {
        await this.router.navigate(['/to-read']);
        return;
      }
      case BookStatus.Done: {
        await this.router.navigate(['done']);
        return;
      }
      case BookStatus.InProgress: {
        await this.router.navigate(['in-progress']);
        return;
      }
    }
  }

  private readAutocompleteData(books: Book[], series: Collection[]): void {
    this._genres = this.sortGenresByCount(books);
    this.authors = this.sortAuthorsByCount(books);
    this.tags = this.sortTagsByCount(books);

    this._series = _(series).orderBy(item => item.name).toArray();
  }

  private readAction(action: Action): void {
    this.action = action;

    if (this.action === Action.Create) {
      this.titleService.setBookCreate();
    } else if (this.action === Action.Edit) {
      this.titleService.setBookEdit();
    }
  }

  private sortGenresByCount(books: Book[]): string[] {
    return _(books)
      .where(item => !!item.genre)
      .select(item => item.genre)
      .groupBy(item => item, new StringComparer(), grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .select(item => item.key)
      .toArray();
  }

  private sortAuthorsByCount(books: Book[]): string[] {
    return _(books)
      .where(item => item.authors.length > 0)
      .selectMany(item => item.authors)
      .groupBy(item => item, new StringComparer(), grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .select(item => item.key)
      .toArray();
  }

  private sortTagsByCount(books: Book[]): string[] {
    return _(books)
      .where(item => item.tags.length > 0)
      .selectMany(item => item.tags)
      .groupBy(item => item, new StringComparer(), grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .select(item => item.key)
      .toArray();
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
      progressType: new FormControl(this.book.progressType || this.progressAlgorithmPreference || ProgressAlgorithmType.Done),
    });

    this._filteredGenres = this.form.get('genre').valueChanges.pipe(
      startWith(this.genre || ''),
      map(item => new FuzzySearch().search(this._genres, item)),
    );

    this.form.get('progressType').valueChanges.subscribe(v => this.progressAlgorithmPreference = v);

    this.form.get('status').valueChanges.subscribe(status => this.onStatusChange(status));
  }

  private onStatusChange(status: BookStatus): void {
    if (this.book.status === BookStatus.ToRead && status === BookStatus.InProgress) {
      const date = new Date();

      this.form.get('started').setValue({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      } as BookDate);
    } else if (this.book.status === BookStatus.InProgress && status === BookStatus.Done) {
      const date = new Date();

      this.form.get('finished').setValue({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      } as BookDate);

      const total = this.form.get('totalUnits').value;
      this.form.get('doneUnits').setValue(total);
    }
  }
}

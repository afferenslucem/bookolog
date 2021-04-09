import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
import { ProgressAlgorithmSolver } from '../../utils/progress-algorithm-solver';
import { CollectionService } from '../../../collection/services/collection.service';
import {BookDataForm} from '../../utils/book-data-form';

@Component({
  selector: 'app-book-edit-view',
  templateUrl: './book-edit-view.component.html',
  styleUrls: ['./book-edit-view.component.scss'],
})
export class BookEditViewComponent implements OnInit {
  public BookType: typeof BookType = BookType;
  public BookStatus: typeof BookStatus = BookStatus;
  public ProgressAlgorithm: typeof ProgressAlgorithmType = ProgressAlgorithmType;
  public bookForm: BookDataForm = null;
  public authors: string[] = [];
  public tags: string[] = [];
  private logger = getConsoleLogger('BookEditViewComponent');
  private action: Action;

  private _filteredGenres: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    private collectionService: CollectionService,
    private location: Location,
    private router: Router,
  ) {
    activatedRoute.data.subscribe(data => {
      this.formFromBook(data.book);
      if (data.status) {
        this.bookForm.status = data.status;
      }

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
    return this.bookForm.series;
  }

  public get allSeries(): Collection[] {
    return this._series;
  }

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
    return ProgressAlgorithmSolver.getAlgorithm(this.type);
  }

  public set progressAlgorithmPreference(v: ProgressAlgorithmType) {
    ProgressAlgorithmSolver.setAlgorithm(this.type, v);
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

      if (data.collectionGuid) {
        await this.collectionService.updateModifyTime(data.collectionGuid);
      }

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
    switch (this.bookForm.status) {
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

    this._series = series;
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
    this.bookForm = new BookDataForm(book);
    const progressType = this.action === Action.Create ? ProgressAlgorithmSolver.getAlgorithm(this.book.type) : this.book.progressType;

    this.bookForm.progressType = progressType;

    this._filteredGenres = this.form.get('genre').valueChanges.pipe(
      startWith(this.genre || ''),
      map(item => new FuzzySearch().search(this._genres, item)),
    );

    this.bookForm.registerOnProgressType(v => this.progressAlgorithmPreference = v);
    this.bookForm.registerOnTypeChange(() => this.onTypeChange());
    this.bookForm.registerOnStatusChange(status => this.onStatusChange(status));
  }

  private onStatusChange(status: BookStatus): void {
    if (this.book.status === BookStatus.ToRead && status === BookStatus.InProgress) {
      this.bookForm.started = DateUtils.today;
    } else if (this.book.status === BookStatus.InProgress && status === BookStatus.Done) {
      this.bookForm.finished = DateUtils.today;
      this.bookForm.doneUnits = this.bookForm.totalUnits;
    }
  }

  private onTypeChange(): void {
    this.bookForm.progressType = this.progressAlgorithmPreference;
  }

  public get form(): FormGroup {
    return this.bookForm.form;
  }

  public get book(): Book {
    return this.bookForm.snapshot;
  }
}

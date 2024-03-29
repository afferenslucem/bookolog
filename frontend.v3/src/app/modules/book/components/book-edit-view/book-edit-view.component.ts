import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import _ from 'declarray';
import { from, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Action } from '../../../../main/resolvers/action.resolver';
import { DateUtils } from '../../../../main/utils/date-utils';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { Collection } from '../../../collection/models/collection';
import { NotificationService } from '../../../notification/services/notification.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookService } from '../../services/book.service';
import { Location } from '@angular/common';
import { CollectionService } from '../../../collection/services/collection.service';
import { BookDataForm } from '../../utils/book-data-form';
import { AbstractBookDataForm } from '../../utils/abstract-book-data-form';
import { BookSortUtils } from '../../../../main/utils/book-sort-utils';
import { ProgressAlgorithmService } from '../../services/progress-algorithm.service';
import { BrokenConnectionError } from '../../../../main/models/errors/broken-connection-error';
import { MetrikaService } from '../../../metrika/services/metrika.service';

@Component({
  selector: 'app-book-edit-view',
  templateUrl: './book-edit-view.component.html',
  styleUrls: ['./book-edit-view.component.scss'],
})
export class BookEditViewComponent extends AbstractBookDataForm implements OnInit {
  public authors: string[] = [];
  public tags: string[] = [];
  public action: Action;

  public sortUtils = new BookSortUtils();
  private _filteredGenres: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private metrika: MetrikaService,
    collectionService: CollectionService,
    progressAlgorithmService: ProgressAlgorithmService,
    router: Router,
  ) {
    super(router, collectionService, progressAlgorithmService);

    activatedRoute.data.subscribe(data => this.onDataInit(data));
  }

  private _genres: string[] = [];

  public get genres(): Observable<string[]> {
    return this._filteredGenres;
  }

  private _series: Collection[] = [];

  public get series(): string {
    return this.bookForm.collectionGuid;
  }

  public get allSeries(): Collection[] {
    return this._series;
  }

  public onDataInit(data: Data): void {
    this.formFromBook(data.book);

    if (data.status) {
      this.book.status = data.status;
    }

    this.readAutocompleteData(data.allBooks, data.series);
    this.readAction(data.action);

    this.bookForm.build();

    this._filteredGenres = this.bookForm.genreChanges.pipe(
      startWith(this.genre || ''),
      map(item => new FuzzySearch().search(this._genres, item)),
      map(item => _(item)),
      map(item => item.where(variant => variant !== this.genre)),
      switchMap(item => from(item.promisify().toArray())),
    );
    this.bookForm.progressTypeChanges.subscribe(v => (this.progressAlgorithmPreference = v));
    this.bookForm.typeChanges.subscribe(type => this.onTypeChange(type));
    this.bookForm.statusChanges.subscribe(status => this.onStatusChange(status));
  }

  public ngOnInit(): void {}

  public async submit(): Promise<void> {
    try {
      const data = this.value;
      await this.bookService.saveOrUpdate(data);
      await this.touchCollectionIfExists(data);

      await this.redirect();
    } catch (e) {
      if (e instanceof BrokenConnectionError) {
        this.notificationService.createWarningNotification('Книга сохранена локально');
        await this.redirect();
      } else {
        this.logSaveError();
      }
    }
  }

  public async processBook(book: Book): Promise<Book> {
    const result = await this.bookService.saveOrUpdate(book);
    return result;
  }

  public readAutocompleteData(books: Book[], series: Collection[]): void {
    this._genres = this.sortGenresByCount(books);
    this.authors = this.sortAuthorsByCount(books);
    this.tags = this.sortTagsByCount(books);

    this._series = this.sortCollectionsByUsage(series);
  }

  public readAction(action: Action): void {
    this.action = action;
  }

  public sortGenresByCount(books: Book[]): string[] {
    return this.sortUtils.sortGenresByCountDesc(books);
  }

  public onStatusChange(status: BookStatus): void {
    if (this.book.status === BookStatus.ToRead && status === BookStatus.InProgress) {
      this.bookForm.started = DateUtils.today;
    } else if (this.book.status === BookStatus.InProgress && status === BookStatus.Done) {
      this.bookForm.finished = DateUtils.today;
    }
  }

  public async redirect(): Promise<void> {
    if (this.action === Action.Create) {
      this.metrika.fireBookCreate();
      await this.redirectToList();
    } else {
      this.metrika.fireBookUpdate();
      this.location.back();
    }
  }

  private logSaveError(): void {
    this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
      autoclose: false,
    });
  }

  private sortAuthorsByCount(books: Book[]): string[] {
    return this.sortUtils.sortAuthorsByCountDesc(books);
  }

  private sortTagsByCount(books: Book[]): string[] {
    return this.sortUtils.sortTagsByCountDesc(books);
  }

  private sortCollectionsByUsage(series: Collection[]): Collection[] {
    return BookSortUtils.sortEntitiesByUsageTimeDesc<Collection>(_(series)).toArray();
  }

  private formFromBook(book: Book): void {
    this.bookForm = new BookDataForm(book);
    this.book.progressType =
      this.action === Action.Create ? this.progressAlgorithmService.getAlgorithm(this.book.type) : this.book.progressType;
  }

  public trackByValue(index: number, item: any): string {
    return item;
  }
}

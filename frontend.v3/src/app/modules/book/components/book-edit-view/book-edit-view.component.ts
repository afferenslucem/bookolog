import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import _ from 'declarray';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {getConsoleLogger} from '../../../../main/app.logging';
import {Action} from '../../../../main/resolvers/action.resolver';
import {DateUtils} from '../../../../main/utils/date-utils';
import {FuzzySearch} from '../../../../main/utils/fuzzy-search';
import {StringComparer} from '../../../../main/utils/string.comparer';
import {Collection} from '../../../collection/models/collection';
import {NotificationService} from '../../../notification/services/notification.service';
import {TitleService} from '../../../ui/service/title.service';
import {Book} from '../../models/book';
import {BookStatus} from '../../models/book-status';
import {BookService} from '../../services/book.service';
import {Location} from '@angular/common';
import {ProgressAlgorithmSolver} from '../../utils/progress-algorithm-solver';
import {CollectionService} from '../../../collection/services/collection.service';
import {BookDataForm} from '../../utils/book-data-form';
import {AbstractBookDataForm} from '../../utils/abstract-book-data-form';
import {BookSortUtils} from '../../../../main/utils/book-sort-utils';

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

  private _genres: string[] = [];
  private _series: Collection[] = [];
  private logger = getConsoleLogger('BookEditViewComponent');

  private _filteredGenres: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    private location: Location,
    collectionService: CollectionService,
    router: Router,
  ) {
    super(router, collectionService);

    activatedRoute.data.subscribe(data => this.onDataInit(data));
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
      map(item => item.filter(Boolean)),
    );
    this.bookForm.progressTypeChanges.subscribe(v => this.progressAlgorithmPreference = v);
    this.bookForm.typeChanges.subscribe(() => this.onTypeChange());
    this.bookForm.statusChanges.subscribe(status => this.onStatusChange(status));
  }
  public get genres(): Observable<string[]> {
    return this._filteredGenres;
  }

  public get series(): string {
    return this.bookForm.collectionGuid;
  }
  public get allSeries(): Collection[] {
    return this._series;
  }

  public ngOnInit(): void {
  }

  public async submit(): Promise<void> {
    try {
      const data = this.value;
      await this.bookService.saveOrUpdate(data);
      await this.touchCollectionIfExists(data);

      if (this.action === Action.Create) {
        await this.redirect();
      } else {
        this.location.back();
      }
    } catch (e) {
      this.logSaveError(e);
    }
  }

  public async processBook(book: Book): Promise<Book> {
    const result = await this.bookService.saveOrUpdate(book);
    return result;
  }

  private logSaveError(e: any): void {
    this.logger.error('Book save error', e);
    this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
      autoclose: false,
    });
  }

  public readAutocompleteData(books: Book[], series: Collection[]): void {
    this._genres = this.sortGenresByCount(books);
    this.authors = this.sortAuthorsByCount(books);
    this.tags = this.sortTagsByCount(books);

    this._series = this.sortCollectionsByUsage(series);
  }

  public readAction(action: Action): void {
    this.action = action;

    if (this.action === Action.Create) {
      this.titleService.setBookCreate();
    } else if (this.action === Action.Edit) {
      this.titleService.setBookEdit();
    }
  }

  public sortGenresByCount(books: Book[]): string[] {
    return this.sortUtils.sortGenresByCountDesc(books);
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
    this.book.progressType = this.action === Action.Create ? ProgressAlgorithmSolver.getAlgorithm(this.book.type) : this.book.progressType;
  }

  public onStatusChange(status: BookStatus): void {
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
}

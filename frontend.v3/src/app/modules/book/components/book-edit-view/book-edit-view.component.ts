import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { getLogger } from '../../../../main/app.logging';
import { DateUtils } from '../../../../main/utils/date-utils';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookData } from '../../models/book-data';
import { BookDate } from '../../models/book-date';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { Action } from '../../resolvers/action.resolver';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-edit-view',
  templateUrl: './book-edit-view.component.html',
  styleUrls: ['./book-edit-view.component.scss'],
})
export class BookEditViewComponent implements OnInit {
  private logger = getLogger('BookEditViewComponent');

  public book: Book;

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  public form: FormGroup = null;
  public authors: string[] = [];
  public tags: string[] = [];

  private action: Action;

  private defaultValue: BookData = {
    guid: '',
    name: '',
    status: BookStatus.ToRead,
    type: BookType.Paper,
    year: null,
    genre: '',
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

  private _filteredGenres: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    activatedRoute.data.subscribe(data => {
      this.book = Object.assign({}, data.book || new Book(this.defaultValue));

      if (data.status) {
        this.book.status = data.status;
      }

      this.formFromBook(this.book);

      this.readAutocompleteData(data.allBooks);

      this.readAction(data.action);
    });
  }

  private _genres: string[] = [];

  public get genres(): string[] {
    return this._filteredGenres;
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

  public ngOnInit(): void {
    this.titleService.setBookEdit();
  }

  public async submit(): Promise<void> {
    try {
      const data = Object.assign(this.book, this.form.value) as Book;

      data.modifyDate = DateUtils.nowUTC;

      if (!data.createDate) {
        data.createDate = DateUtils.nowUTC;
      }

      await this.bookService.saveOrUpdate(data);

      await this.redirect();
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
        autoclose: false
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

  private readAutocompleteData(books: Book[]): void {
    this._genres = this.sortGenresByCount(books);
    this._filteredGenres = this._genres;

    this.authors = this.sortAuthorsByCount(books);
    this.tags = this.sortTagsByCount(books);
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
      status: new FormControl(book.status),
      type: new FormControl(book.type),
      started: new FormControl(book.started),
      finished: new FormControl(book.finished),
      doneUnits: new FormControl(book.doneUnits || null),
      totalUnits: new FormControl(book.totalUnits || null),
      authors: new FormControl(book.authors),
      tags: new FormControl(book.tags),
    });

    this.form.get('genre').valueChanges.subscribe(genre => {
      this._filteredGenres = new FuzzySearch().search(this._genres, genre.toLowerCase());
    });

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getConsoleLogger } from '../../../../main/app.logging';
import { Action } from '../../../../main/resolvers/action.resolver';
import { DateUtils } from '../../../../main/utils/date-utils';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookData } from '../../models/book-data';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { Location } from '@angular/common';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

@Component({
  selector: 'app-book-reread-form',
  templateUrl: './book-reread-form.component.html',
  styleUrls: ['./book-reread-form.component.scss'],
})
export class BookRereadFormComponent implements OnInit {
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
    rereadingBookGuid: null,
    rereadedBy: [],
  };

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

      this.formFromBook(this.book);
    });
  }

  public get status(): BookStatus {
    return this.form.get('status').value;
  }

  public get type(): BookType {
    return this.form.get('type').value;
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

      data.rereadingBookGuid = data.guid;
      data.guid = undefined;

      await this.bookService.saveRereading(data);

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

    this.form.get('progressType').valueChanges.subscribe(v => this.progressAlgorithmPreference = v);
  }
}

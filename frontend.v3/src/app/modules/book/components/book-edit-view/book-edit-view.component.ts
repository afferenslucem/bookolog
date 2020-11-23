import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { DateUtils } from '../../../../main/utils/date-utils';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookData } from '../../models/book-data';
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
    const data = Object.assign(this.book, this.form.value) as Book;

    data.modifyDate = DateUtils.nowUTC;

    if (!data.createDate) {
      data.createDate = DateUtils.nowUTC;
    }

    data.shouldSync = true;

    await this.bookService.saveOrUpdate(data);

    await this.redirect();
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
    const genresCount = _(books)
      .select(item => item.genre)
      .where(item => !!item)
      .aggregate((acc: { [key: string]: number }, item: string) => {
        const key = item.toLowerCase();

        const counter: number = acc[key] || 0;

        acc[key] = counter + 1;

        return acc;
      }, {});

    return _(Object.entries(genresCount))
      .orderByDescending(item => item[1])
      .select(item => item[0])
      .toArray();
  }

  private sortAuthorsByCount(books: Book[]): string[] {
    const authorsCount = _(books)
      .selectMany(item => item.authors)
      .where(item => !!item)
      .aggregate((acc: { [key: string]: number }, item: string) => {
        const key = item;

        const counter: number = acc[key] || 0;

        acc[key] = counter + 1;

        return acc;
      }, {});

    return _(Object.entries(authorsCount))
      .orderByDescending(item => item[1])
      .select(item => item[0])
      .toArray();
  }

  private sortTagsByCount(books: Book[]): string[] {
    const tagsCount = _(books)
      .selectMany(item => item.tags)
      .where(item => !!item)
      .aggregate((acc: { [key: string]: number }, item: string) => {
        const key = item.toLowerCase();

        const counter: number = acc[key] || 0;

        acc[key] = counter + 1;

        return acc;
      }, {});

    return _(Object.entries(tagsCount))
      .orderByDescending(item => item[1])
      .select(item => item[0])
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
  }
}

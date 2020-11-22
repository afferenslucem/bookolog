import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { CapitalizePipe } from '../../../formatting/pipes/capitalize.pipe';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import _ from 'declarray';

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

  private _genres: string[] = [];

  private _filteredGenres: string[] = [];

  public authors: string[] = [];
  public tags: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, public titleService: TitleService, public dialog: MatDialog, private bookService: BookService) {
    activatedRoute.data.subscribe(data => {
      if (data.book) {
        this.book = data.book;
        this.formFromBook(this.book);
      }
      if (data.allBooks) {
        this.readAutocompleteData(data.allBooks);
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setBookEdit();
  }

  private readAutocompleteData(books: Book[]): void {
    this._genres = this.sortGenresByCount(books);
    this._filteredGenres = this._genres;

    this.authors = this.sortAuthorsByCount(books);
    this.tags = this.sortTagsByCount(books);
  }

  private sortGenresByCount(books: Book[]): string[] {
    const genresCount = _(books)
      .select(item => item.genre)
      .where(item => !!item)
      .aggregate((acc: {[key: string]: number}, item: string) => {
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
      .aggregate((acc: {[key: string]: number}, item: string) => {
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
      .aggregate((acc: {[key: string]: number}, item: string) => {
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
      startDate: new FormControl(book.started),
      endDate: new FormControl(book.finished),
      done: new FormControl(book.doneUnits),
      total: new FormControl(book.totalUnits),
      authors: new FormControl(book.authors),
      tags: new FormControl(book.tags),
    });

    this.form.get('genre').valueChanges.subscribe(genre => {
      this._filteredGenres = new FuzzySearch().search(this._genres, genre.toLowerCase());
    });
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

  public get genres(): string[] {
    return this._filteredGenres;
  }
}

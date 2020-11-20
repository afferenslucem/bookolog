import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-edit-view',
  templateUrl: './book-edit-view.component.html',
  styleUrls: ['./book-edit-view.component.scss']
})
export class BookEditViewComponent implements OnInit {public book$: Observable<Book> = new Observable<Book>();
  public book: Book;

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  public form: FormGroup = null;

  constructor(private activatedRoute: ActivatedRoute, public titleService: TitleService, public dialog: MatDialog, private bookService: BookService) {
    activatedRoute.data.subscribe(data => {
      this.book = data.book;
      this.formFromBook(this.book);
    });
  }

  private formFromBook(book: Book): void {
    this.form = new FormBuilder().group({
      name: new FormControl(book.name, [Validators.required]),
      year: new FormControl(book.year),
      genre: new FormControl(book.genre),
      status: new FormControl(book.status),
      type: new FormControl(book.type),
    });
  }

  ngOnInit(): void {
    this.titleService.setBookEdit();
  }
}

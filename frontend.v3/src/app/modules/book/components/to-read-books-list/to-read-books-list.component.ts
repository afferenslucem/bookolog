import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';

@Component({
  selector: 'app-to-read-book-list',
  templateUrl: './to-read-books-list.component.html',
  styleUrls: ['./to-read-books-list.component.scss'],
  providers: [BookActionService],
})
export class ToReadBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
    );
  }

  ngOnInit(): void {
    this.title.setToReadList();
  }

}

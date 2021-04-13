import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'declarray';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
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
      map(item => item.books),
      map(books => this.sortBooks(books)),
    );
  }

  ngOnInit(): void {
    this.title.setToReadList();
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  private sortBooks(books: Book[]): Book[] {
    return _(books)
      .orderByDescending(item => item.modifyDate)
      .thenByDescending(item => item.createDate)
      .toArray();
  }
}

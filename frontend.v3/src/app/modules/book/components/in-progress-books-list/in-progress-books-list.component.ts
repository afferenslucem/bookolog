import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'declarray';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';

@Component({
  selector: 'app-in-progress-books-list',
  templateUrl: './in-progress-books-list.component.html',
  styleUrls: ['./in-progress-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookActionService],
})
export class InProgressBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute) {
    this.books$ = this.route.data.pipe(
      map(item => item.books),
      map(books => this.sortBooks(books)),
    );
  }

  ngOnInit(): void {}

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

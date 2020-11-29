import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';
import _ from 'declarray';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress-books-list.component.html',
  styleUrls: ['./in-progress-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookActionService],
})
export class InProgressBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
      map(books => this.sortBooks(books)),
    );
  }

  private sortBooks(books: Book[]): Book[] {
    return _(books)
      .orderByDescending(item => item.modifyDate)
      .thenByDescending(item => item.createDate)
      .toArray();
  }

  ngOnInit(): void {
    this.title.setInProgressList();
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }
}

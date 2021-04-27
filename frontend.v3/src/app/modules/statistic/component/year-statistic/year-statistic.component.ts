import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BookTrackBy } from 'src/app/main/utils/book-track-by';
import { Book } from 'src/app/modules/book/models/book';
import _ from 'declarray';
import { BookStatus } from '../../../book/models/book-status';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-year-statistic',
  templateUrl: './year-statistic.component.html',
  styleUrls: ['./year-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearStatisticComponent implements OnInit {
  public books$: Observable<Book[]>;
  public filter$: Observable<string> = null;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => item.books),
      map(item => this.sortBooks(item.books)),
    );

    this.filter$ = route.params.pipe(
      map(data => data.filter),
      tap(data => this.title.setCustom(data)),
    );
  }

  ngOnInit(): void {
    this.filter$.subscribe();
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  public sortBooks(books: Book[]): Book[] {
    return _(books)
      .where(item => item.status === BookStatus.Done)
      .orderByDescending(item => item.finished.month || -1)
      .thenByDescending(item => item.finished.day || -1)
      .thenByDescending(item => item.modifyDate || -1)
      .thenByDescending(item => item.createDate || -1)
      .toArray();
  }
}

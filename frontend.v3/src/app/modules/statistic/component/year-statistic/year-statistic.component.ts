import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookTrackBy } from 'src/app/main/utils/book-track-by';
import { Book } from 'src/app/modules/book/models/book';
import { TitleService } from 'src/app/modules/ui/service/title.service';
import _ from 'declarray';
import {BookStatus} from '../../../book/models/book-status';

@Component({
  selector: 'app-year-statistic',
  templateUrl: './year-statistic.component.html',
  styleUrls: [ './year-statistic.component.scss' ]
})
export class YearStatisticComponent implements OnInit {
  public books$: Observable<Book[]>;
  private filter$: Observable<string> = null;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
    );

    this.filter$ = route.params.pipe(map(data => data.filter));
  }

  ngOnInit(): void {
    this.filter$.subscribe(item => this.title.setCustom(item));
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  public sortBooks(books: Book[]): Book[] {
    return _(books)
      .where(item => item.status === BookStatus.Done)
      .orderByDescending(item => item.finished.month || -1)
      .thenByDescending(item => item.finished.month || -1)
      .toArray();
  }
}

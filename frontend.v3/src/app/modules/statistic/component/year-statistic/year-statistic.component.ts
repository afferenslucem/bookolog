import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Book } from 'src/app/modules/book/models/book';
import _ from 'declarray';
import { BookStatus } from '../../../book/models/book-status';
import { TitleService } from '../../../title/services/title.service';
import { BookSearchableList } from '../../../book/utils/book-searchable-list';
import { SearchService } from '../../../search/services/search.service';
import { BookSortUtils } from '../../../../main/utils/book-sort-utils';

@Component({
  selector: 'app-year-statistic',
  templateUrl: './year-statistic.component.html',
  styleUrls: ['./year-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearStatisticComponent extends BookSearchableList implements OnInit {
  public dataFilter$: Observable<string> = null;

  constructor(route: ActivatedRoute, searchService: SearchService, private title: TitleService) {
    super(route, searchService);

    this.dataFilter$ = route.params.pipe(
      map(data => data.filter),
      tap(data => this.title.setCustom(data)),
    );
  }

  ngOnInit(): void {
    this.dataFilter$.subscribe();
  }

  public sortBooks(books: Book[]): Book[] {
    books = _(books)
      .where(item => item.status === BookStatus.Done)
      .toArray();

    return new BookSortUtils().sortBooksByFinishDate(books);
  }
}

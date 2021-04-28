import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TitleService } from '../../../title/services/title.service';
import { BookSearchableList } from '../../../book/utils/book-searchable-list';
import { SearchService } from '../../../search/services/search.service';

@Component({
  selector: 'app-book-filtered',
  templateUrl: './book-filtered.component.html',
  styleUrls: ['./book-filtered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilteredComponent extends BookSearchableList implements OnInit {
  public filterParam$: Observable<string> = null;

  constructor(activatedRoute: ActivatedRoute, searchService: SearchService, private title: TitleService) {
    super(activatedRoute, searchService);

    this.filterParam$ = activatedRoute.params.pipe(
      map(data => data.filter),
      tap(data => this.title.setCustom(data)),
    );
  }

  ngOnInit(): void {
    this.filterParam$.subscribe();
  }
}

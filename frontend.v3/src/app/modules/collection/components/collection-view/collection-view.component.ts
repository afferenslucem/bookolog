import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';
import { Collection } from '../../models/collection';
import _ from 'declarray';

@Component({
  selector: 'app-collection',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {
  public books$: Observable<Book[]>;
  public collection$: Observable<Collection>;

  constructor(activatedRoute: ActivatedRoute, private titleService: TitleService) {
    const data$ = activatedRoute.data;

    this.books$ = data$.pipe(
      filter(item => item.books),
      map(item => item.books as Book[]),
      map(item => _(item).orderBy(book => book.collectionOrder).toArray()),
    );

    this.collection$ = data$.pipe(
      filter(item => item.collection),
      map(item => item.collection as Collection),
      tap(item => this.titleService.setCustom(item.name))
    );
  }

  public ngOnInit(): void {
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }
}

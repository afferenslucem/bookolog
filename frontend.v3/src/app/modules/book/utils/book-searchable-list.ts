import { SearchableList } from '../../../main/utils/searchable-list';
import { combineLatest, Observable } from 'rxjs';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../search/services/search.service';
import { filter, map } from 'rxjs/operators';
import { FuzzySearch } from '../../../main/utils/fuzzy-search';
import { BookSortUtils } from '../../../main/utils/book-sort-utils';
import { BookTrackBy } from '../../../main/utils/book-track-by';

export abstract class BookSearchableList extends SearchableList {
  public books$: Observable<Book[]>;
  private _books$: Observable<Book[]>;

  constructor(private route: ActivatedRoute, searchService: SearchService) {
    super(searchService);

    this._books$ = this.route.data.pipe(
      filter(item => item.books),
      map(item => this.sortBooks(item.books)),
    );

    this.books$ = combineLatest([this._books$, this.filter$]).pipe(
      map(([books, filter]: [Book[], string]) => new FuzzySearch().search(books, filter)),
    );
  }

  public sortBooks(books: Book[]): Book[] {
    return new BookSortUtils().sortBooksByFinishDate(books);
  }

  public softFilter(books: Book[]): Book[] {
    return new BookSortUtils().sortBooksByFinishDate(books);
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }
}

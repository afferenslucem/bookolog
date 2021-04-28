import { SearchService } from '../../modules/search/services/search.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export abstract class SearchableList {
  protected constructor(private searchService: SearchService) {}

  protected get filter$(): Observable<string> {
    return this.searchService.filter$.pipe(
      startWith(null),
      map(item => item || ''),
    );
  }
}

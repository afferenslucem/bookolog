import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { SearchableList } from '../../../../main/utils/searchable-list';
import { SearchService } from '../../../search/services/search.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'declarray';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticListComponent extends SearchableList implements OnInit {
  public filteredData: Observable<IGroupedData<string, number>[]>;

  @Input()
  public data: IGroupedData<string, number>[] = [];

  @Output()
  public selected = new EventEmitter<string>();

  constructor(searchService: SearchService) {
    super(searchService);
  }

  ngOnInit(): void {
    this.filteredData = this.filter$.pipe(
      map(value =>
        _(this.data)
          .where(item => new FuzzySearch().contains(item.key, value.toLowerCase()))
          .toArray(),
      ),
    );
  }
}

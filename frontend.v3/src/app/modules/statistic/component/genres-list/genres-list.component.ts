import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresListComponent implements OnInit {
  public genres$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService, private router: Router) {
    this.genres$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countGenres(data)),
    );
  }

  ngOnInit(): void {
    this.titleService.setGenresStatistic();
  }

  public async selectedGenre(tag: string): Promise<void> {
    await this.router.navigate(['/genre', tag]);
  }

  public countGenres(books: Book[]): IGroupedData<any, number>[] {
    return  _(books)
      .where(item => !!item.genre)
      .select(item => item.genre)
      .groupBy(item => item, new StringComparer(), grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .toArray();
  }
}

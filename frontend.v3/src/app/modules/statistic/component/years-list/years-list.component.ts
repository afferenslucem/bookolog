import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { Book } from 'src/app/modules/book/models/book';
import { TitleService } from 'src/app/modules/ui/service/title.service';
import _ from 'declarray';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-years-list',
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearsListComponent implements OnInit {
  public years$: Observable<IGroupedData<string, number>[]> = null;

  constructor(activateRoute: ActivatedRoute, private titleService: TitleService, private router: Router) {
    this.years$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countYears(data)),
    );
  }

  ngOnInit(): void {
    this.titleService.setYearsStatistic();
  }

  public async selectedYear(year: string): Promise<void> {
    await this.router.navigate(['/year', year]);
  }

  public countYears(books: Book[]): IGroupedData<string, number>[] {
    return _(books)
      .groupBy(item => item.finished.year || null, grouped => grouped.count())
      .orderByDescending(item => item.key)
      .select(item => ({
        key: item.key ? item.key.toString() : 'Не указан',
        group: item.group
      }))
      .toArray();
  }
}

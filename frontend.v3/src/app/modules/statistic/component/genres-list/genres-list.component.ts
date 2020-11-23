import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss']
})
export class GenresListComponent implements OnInit {
  public genres$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService) {
    this.genres$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countGenres(data)),
    );
  }

  ngOnInit(): void {
    this.titleService.setGenresStatistic();
  }

  private countGenres(books: Book[]): IGroupedData<any, number>[] {
    return  _(books)
      .where(item => !!item.genre)
      .select(item => item.genre)
      .groupBy(item => item, grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .toArray();
  }
}

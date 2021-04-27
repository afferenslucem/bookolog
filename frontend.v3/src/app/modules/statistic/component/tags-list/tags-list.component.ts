import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { Book } from '../../../book/models/book';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent implements OnInit {
  public tags$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.tags$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countTags(data)),
    );
  }

  ngOnInit(): void {}

  public async selectedTag(tag: string): Promise<void> {
    await this.router.navigate(['/tag', tag]);
  }

  public countTags(books: Book[]): IGroupedData<any, number>[] {
    return _(books)
      .where(item => item.tags.length > 0)
      .selectMany(item => item.tags)
      .groupBy(
        item => item,
        new StringComparer(),
        grouped => grouped.count(),
      )
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .toArray();
  }
}

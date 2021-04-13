import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {
  public authors$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService, private router: Router) {
    this.authors$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countAuthors(data)),
    );
  }

  ngOnInit(): void {
    this.titleService.setAuthorsStatistic();
  }

  public async selectedAuthor(tag: string): Promise<void> {
    await this.router.navigate(['/author', tag]);
  }

  public countAuthors(books: Book[]): IGroupedData<any, number>[] {
    return _(books)
      .where(item => item.authors.length > 0)
      .selectMany(item => item.authors)
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

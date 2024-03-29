import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'declarray';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringComparator } from '../../../../main/utils/string-comparator';
import { Book } from '../../../book/models/book';
import { IGroupedData } from 'declarray/dist/interfaces/i-grouped-data';

@Component({
  selector: 'app-author-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {
  public authors$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.authors$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countAuthors(data)),
    );
  }

  ngOnInit(): void {}

  public async selectedAuthor(tag: string): Promise<void> {
    await this.router.navigate(['/author', tag]);
  }

  public countAuthors(books: Book[]): IGroupedData<any, number>[] {
    return _(books)
      .where(item => item.authors.length > 0)
      .selectMany(item => item.authors)
      .groupBy(
        item => item,
        new StringComparator(),
        grouped => grouped.count(),
      )
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .toArray();
  }
}

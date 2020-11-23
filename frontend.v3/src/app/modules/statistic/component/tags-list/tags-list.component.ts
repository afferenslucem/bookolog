import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import _ from 'declarray';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  public tags$: Observable<IGroupedData<string, number>[]> = null;

  constructor(private activateRoute: ActivatedRoute, private titleService: TitleService, private router: Router) {
    this.tags$ = activateRoute.data.pipe(
      map(data => data.books as Book[]),
      map(data => this.countTags(data)),
    );
  }

  ngOnInit(): void {
    this.titleService.setTagsStatistic();
  }

  private countTags(books: Book[]): IGroupedData<any, number>[] {
    return  _(books)
      .where(item => item.tags.length > 0)
      .selectMany(item => item.tags)
      .groupBy(item => item, grouped => grouped.count())
      .orderByDescending(item => item.group)
      .thenBy(item => item)
      .toArray();
  }

  public async selectedTag(tag: string) {
    await this.router.navigate(['/tag', tag]);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';

@Component({
  selector: 'app-done-books-list',
  templateUrl: './done-books-list.component.html',
  styleUrls: ['./done-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookActionService],
})
export class DoneBooksListComponent implements OnInit {
  public years$: Observable<IGroupedData<number, Book[]>[]>;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.years$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
      map(books => this.groupBooks(books))
    );
  }

  public groupBooks(books: Book[]): IGroupedData<number, Book[]>[] {
    return _(books)
      .orderByDescending(item => item.finished.year || -1)
      .orderByDescending(item => item.finished.month || -1)
      .orderByDescending(item => item.finished.day || -1)
      .orderByDescending(item => item.modifyDate)
      .groupBy(item => item.finished.year || -1, group => group.toArray())
      .orderByDescending(item => item.key)
      .toArray();
  }

  public ngOnInit(): void {
    this.title.setDoneList();
  }

  public onParelToggle() {

  }
}

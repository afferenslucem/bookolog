import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookTrackBy } from 'src/app/main/utils/book-track-by';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';
import _ from 'declarray';

@Component({
  selector: 'app-done-books-list',
  templateUrl: './done-books-list.component.html',
  styleUrls: ['./done-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookActionService],
})
export class DoneBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => this.sortBooks(item.books)),
    );
  }

  public ngOnInit(): void {
    this.title.setDoneList();
  }
  
  public sortBooks(books: Book[]): Book[] {
    return _(books)
    .orderByDescending(item => item.finished.year || -1)
    .thenByDescending(item => item.finished.month || -1)
    .thenByDescending(item => item.finished.year || -1)
    .thenByDescending(item => +item.modifyDate || -1)
    .thenByDescending(item => +item.createDate || -1)
    .toArray();
  }
  
  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }
}

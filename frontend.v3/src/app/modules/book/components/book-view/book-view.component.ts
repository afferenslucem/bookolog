import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewComponent implements OnInit {
  public book$: Observable<Book> = new Observable<Book>();

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  constructor(private activatedRoute: ActivatedRoute, public titleService: TitleService) {
    this.book$ = activatedRoute.data.pipe(
      map(data => data.book)
    );
  }

  ngOnInit(): void {
    this.titleService.setBook();
  }

  public getProgressValue(book: Book): number {
    if (!!book.totalUnits && !!book.doneUnits) {
      return Math.floor(book.doneUnits / book.totalUnits * 100);
    } else {
      return 0;
    }
  }
}

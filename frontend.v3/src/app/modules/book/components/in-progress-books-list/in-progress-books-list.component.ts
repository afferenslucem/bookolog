import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Book } from '../../models/book';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress-books-list.component.html',
  styleUrls: ['./in-progress-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InProgressBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
    );
  }

  ngOnInit(): void {
  }

}

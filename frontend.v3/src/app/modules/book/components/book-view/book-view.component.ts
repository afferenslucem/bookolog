import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewComponent implements OnInit {
  public book$: Observable<Book> = new Observable<Book>();

  constructor(private activatedRoute: ActivatedRoute) {
    this.book$ = activatedRoute.data.pipe(
      map(data => data.book)
    );
  }

  ngOnInit(): void {
  }
}

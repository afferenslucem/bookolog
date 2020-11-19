import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import _ from 'declarray';

@Component({
  selector: 'app-done-books-list',
  templateUrl: './done-books-list.component.html',
  styleUrls: ['./done-books-list.component.scss']
})
export class DoneBooksListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(public route: ActivatedRoute, private title: TitleService) {
    this.books$ = this.route.data.pipe(
      filter(item => !!item.books),
      map(item => item.books),
      map(books => this.sortBooks(books))
    );
  }

  private sortBooks(books: Book[]): Book[] {
    return _(books)
      .orderByDescending(item => item.finished.year || -1)
      .orderByDescending(item => item.finished.month || -1)
      .orderByDescending(item => item.finished.day || -1)
      .toArray();
  }

  public ngOnInit(): void {
    this.title.setDoneList();
  }
}

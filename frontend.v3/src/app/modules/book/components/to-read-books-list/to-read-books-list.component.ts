import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'declarray';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';
import { BookSearchableList } from '../../utils/book-searchable-list';
import { SearchService } from '../../../search/services/search.service';

@Component({
  selector: 'app-to-read-books-list',
  templateUrl: './to-read-books-list.component.html',
  styleUrls: ['./to-read-books-list.component.scss'],
  providers: [BookActionService],
})
export class ToReadBooksListComponent extends BookSearchableList implements OnInit {
  constructor(route: ActivatedRoute, searchService: SearchService) {
    super(route, searchService);
  }

  public ngOnInit(): void {}

  public sortBooks(books: Book[]): Book[] {
    return _(books)
      .orderByDescending(item => item.modifyDate)
      .thenByDescending(item => item.createDate)
      .toArray();
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookActionService } from '../../services/book-action.service';
import { SearchService } from '../../../search/services/search.service';
import { BookSearchableList } from '../../utils/book-searchable-list';

@Component({
  selector: 'app-done-books-list',
  templateUrl: './done-books-list.component.html',
  styleUrls: ['./done-books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookActionService],
})
export class DoneBooksListComponent extends BookSearchableList implements OnInit {
  constructor(route: ActivatedRoute, searchService: SearchService) {
    super(route, searchService);
  }

  public ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookActionService } from '../../services/book-action.service';

@Component({
  selector: 'app-book-header',
  templateUrl: './book-header.component.html',
  styleUrls: ['./book-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookHeaderComponent implements OnInit {
  @Input()
  public book: Book;

  @Input()
  public truncate: boolean = true;

  constructor(public actionService: BookActionService) { }

  ngOnInit(): void {
  }

  public get editAllowed(): boolean {
    return this.actionService.editAllowed;
  }
}

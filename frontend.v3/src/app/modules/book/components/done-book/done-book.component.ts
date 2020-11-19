import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-done-book',
  templateUrl: './done-book.component.html',
  styleUrls: ['./done-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoneBookComponent extends BookComponent implements OnInit {
  constructor() {
    super();
  }

  @Input()
  public set book(v: Book) {
    this.innerBook = v;
  }

  ngOnInit(): void {
  }
}

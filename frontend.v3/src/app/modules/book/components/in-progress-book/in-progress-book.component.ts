import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-in-progress-book',
  templateUrl: './in-progress-book.component.html',
  styleUrls: ['./in-progress-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InProgressBookComponent extends BookComponent implements OnInit {
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

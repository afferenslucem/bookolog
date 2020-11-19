import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookLineComponent } from '../book-line/book-line.component';

@Component({
  selector: 'app-in-progress-book',
  templateUrl: './in-progress-book.component.html',
  styleUrls: ['./in-progress-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InProgressBookComponent extends BookLineComponent implements OnInit {
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

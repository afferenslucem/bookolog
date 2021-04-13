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

  public get done(): number {
    return this.innerBook.doneUnits;
  }

  public get total(): number {
    return this.innerBook.totalUnits;
  }

  public get progressValue(): number {
    if (!this.innerBook) {
      return 0;
    }

    return this.innerBook.progressPercents;
  }

  ngOnInit(): void {}
}

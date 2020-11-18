import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-progressing-book',
  templateUrl: './progressing-book.component.html',
  styleUrls: ['./progressing-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressingBookComponent extends BookComponent implements OnInit {
  @Input()
  public set book(v: Book) {
    this.innerBook = v;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}

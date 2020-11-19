import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-to-read-book',
  templateUrl: './to-read-book.component.html',
  styleUrls: ['./to-read-book.component.scss']
})
export class ToReadBookComponent extends BookComponent implements OnInit {
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

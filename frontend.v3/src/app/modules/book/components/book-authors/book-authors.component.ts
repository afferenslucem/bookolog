import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAuthorsComponent implements OnInit {
  @Input()
  public authors: string[];

  constructor() { }

  ngOnInit(): void {
  }

}

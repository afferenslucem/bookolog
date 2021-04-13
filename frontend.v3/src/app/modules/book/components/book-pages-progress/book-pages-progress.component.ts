import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-pages-progress',
  templateUrl: './book-pages-progress.component.html',
  styleUrls: ['./book-pages-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPagesProgressComponent implements OnInit {
  @Input()
  public done: number;

  @Input()
  public total: number;

  constructor() {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-time-progress',
  templateUrl: './book-time-progress.component.html',
  styleUrls: ['./book-time-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookTimeProgressComponent implements OnInit {
  @Input()
  public done: number;

  @Input()
  public total: number;

  constructor() {}

  ngOnInit(): void {}
}

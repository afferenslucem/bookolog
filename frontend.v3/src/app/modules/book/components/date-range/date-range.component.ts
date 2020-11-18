import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent implements OnInit {
  @Input()
  public startDate: Date;

  @Input()
  public endDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}

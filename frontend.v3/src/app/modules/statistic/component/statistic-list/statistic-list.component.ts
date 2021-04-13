import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticListComponent implements OnInit {
  @Input()
  public data: IGroupedData<string, number>[];

  @Output()
  public selected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}

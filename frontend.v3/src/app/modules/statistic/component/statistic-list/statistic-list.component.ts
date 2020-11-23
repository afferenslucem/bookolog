import { Component, Input, OnInit } from '@angular/core';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';

@Component({
  selector: 'app-statistic-list',
  templateUrl: './statistic-list.component.html',
  styleUrls: ['./statistic-list.component.scss']
})
export class StatisticListComponent implements OnInit {
  @Input()
  public data: IGroupedData<string, number>[];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input()
  public value: number;

  constructor() {}

  ngOnInit(): void {}

  public getStyle(): any {
    return {
      width: this.value + '%',
    };
  }
}

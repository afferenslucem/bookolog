import { Component, OnInit } from '@angular/core';
import { ILogMessage } from 'waterlog/lib/i-log-message';
import { getAccumulated } from '../../app.logging';

@Component({
  selector: 'app-logger-window',
  templateUrl: './logger-window.component.html',
  styleUrls: ['./logger-window.component.scss']
})
export class LoggerWindowComponent implements OnInit {

  public get logs(): ILogMessage[] {
    return getAccumulated().logs;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookStatus } from 'src/app/modules/book/models/book-status';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output()
  public navigated = new EventEmitter<void>();

  public BookStatus: typeof BookStatus = BookStatus;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-by-years',
  templateUrl: './books-by-years.component.html',
  styleUrls: ['./books-by-years.component.scss']
})
export class BooksByYearsComponent implements OnInit {
  @Input()
  public set books(v: Book[]) {
    this.years = this.groupBooks(v);
  }

  public years: IGroupedData<number, Book[]>[];

  constructor() { }

  ngOnInit(): void {
  }

  private groupBooks(books: Book[]): IGroupedData<number, Book[]>[] {
    return _(books)
      .orderByDescending(item => item.finished.year || -1)
      .orderByDescending(item => item.finished.month || -1)
      .orderByDescending(item => item.finished.day || -1)
      .orderByDescending(item => item.modifyDate)
      .groupBy(item => item.finished.year || -1, group => group.toArray())
      .orderByDescending(item => item.key)
      .toArray();
  }
}

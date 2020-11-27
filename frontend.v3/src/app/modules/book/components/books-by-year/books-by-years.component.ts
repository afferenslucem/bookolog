import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-by-years',
  templateUrl: './books-by-years.component.html',
  styleUrls: ['./books-by-years.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  public yearTrackBy(index: number, item: IGroupedData<number, Book[]>): number {
    return item.key;
  }
}

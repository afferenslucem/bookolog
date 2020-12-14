import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import _ from 'declarray';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { ISequence } from 'declarray/lib/interfaces/i-sequence';
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
    this.orderedBooks = _(v)
      .orderByDescending(item => item.finished.month || -1)
      .thenByDescending(item => item.finished.day || -1)
      .thenByDescending(item => item.modifyDate)
      .thenByDescending(item => item.createDate)
      .groupBy(item => item.finished.year || -1, group => group.toArray())
      .orderByDescending(item => item.key);

    this.years$ = this.orderedBooks.promisify().toArray();

    this.definedYears$ = this.years$.then(() => this.orderedBooks.where(item => item.key !== -1).toArray());

    this.undefinedYear$ = this.years$.then(() => this.orderedBooks.takeLast(1).firstOrDefault(null, item => item.key === -1));
  }

  private orderedBooks: ISequence<IGroupedData<number, Book[]>>;

  public years$: Promise<IGroupedData<number, Book[]>[]>;

  public definedYears$: Promise<IGroupedData<number, Book[]>[]>;

  public undefinedYear$: Promise<IGroupedData<number, Book[]>>;

  constructor() { }

  ngOnInit(): void {
  }

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  public yearTrackBy(index: number, item: IGroupedData<number, Book[]>): number {
    return item.key;
  }
}

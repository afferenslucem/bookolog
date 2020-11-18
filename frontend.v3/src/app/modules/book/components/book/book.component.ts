import { Book } from '../../models/book';

export class BookComponent {
  protected _book: Book;

  public get name(): string {
    return this._book.name;
  }

  public get authors(): string[] {
    return this._book.authors;
  }

  public get done(): number {
    return this._book.doneUnits;
  }

  public get total(): number {
    return this._book.totalUnits;
  }

  public get progressValue(): number {
    if (!!this.total && !!this.done) {
      return Math.floor(this.done / this.total * 100);
    } else {
      return 0;
    }
  }

  public get startDate(): Date {
    return this._book.startDate;
  }

  public get guid(): string {
    return this._book.guid;
  }
}

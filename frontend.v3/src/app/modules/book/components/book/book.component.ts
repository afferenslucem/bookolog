import { Book } from '../../models/book';

export class BookComponent {
  public innerBook: Book;

  public get name(): string {
    return this.innerBook.name;
  }

  public get authors(): string[] {
    return this.innerBook.authors;
  }

  public get done(): number {
    return this.innerBook.doneUnits;
  }

  public get total(): number {
    return this.innerBook.totalUnits;
  }

  public get progressValue(): number {
    if (!!this.total && !!this.done) {
      return Math.floor(this.done / this.total * 100);
    } else {
      return 0;
    }
  }

  public get startDate(): Date {
    return this.innerBook.startDate;
  }

  public get guid(): string {
    return this.innerBook.guid;
  }
}

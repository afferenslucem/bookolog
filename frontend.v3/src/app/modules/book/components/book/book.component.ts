import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';

export class BookComponent {

  public BookType: typeof BookType = BookType;

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

  public get endDate(): Date {
    return this.innerBook.endDate;
  }

  public get guid(): string {
    return this.innerBook.guid;
  }

  public get type(): BookType {
    return this.innerBook.type;
  }
}

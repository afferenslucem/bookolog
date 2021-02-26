import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';

export class BookLineComponent {
  public BookType: typeof BookType = BookType;

  public innerBook: Book;

  public get name(): string {
    return this.innerBook.name;
  }

  public get authors(): string[] {
    return this.innerBook.authors;
  }

  public get startDate(): Date {
    return this.innerBook.startDate;
  }

  public get guid(): string {
    return this.innerBook.guid;
  }

  public get type(): BookType {
    return this.innerBook.type;
  }
}

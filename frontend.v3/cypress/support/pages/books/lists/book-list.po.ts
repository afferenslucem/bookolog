import { PageObject } from '../../page-object';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';

export abstract class BookListPo extends PageObject {
  protected constructor(url: string) {
    super(url);
  }

  public abstract booksCountIs(count: number): void;

  public abstract lastBookIs(book: IBookCheckData): void;
}

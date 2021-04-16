import { PageObject } from './page-object';
import { IBook } from '../interfaces/i-book';

export abstract class BookListPo extends PageObject {
  protected constructor(url: string) {
    super(url);
  }

  public abstract booksCountIs(count: number): void;

  public abstract lastBookIs(book: IBook): void;
}

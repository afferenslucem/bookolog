import { PageObject } from '../../page-object';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';
import Chainable = Cypress.Chainable;

export abstract class BookListPo extends PageObject {
  protected constructor(url: string) {
    super(url);
  }

  public abstract booksCountIs(count: number): void;

  public abstract lastBookIs(book: IBookCheckData): void;

  public haventGotBook(book: IBookCheckData): void {
    this.containsBook(book).should('not.exist');
  }

  public checkBook(book: IBookCheckData): void {
    this.containsBook(book).within(() => {
      if (book.authors) {
        book.authors.forEach(item => cy.contains(item));
      }

      if (book.started) {
        cy.contains(book.started);
      }

      if (book.finished) {
        cy.contains(book.finished);
      }

      if (book.doneUnits) {
        cy.contains(book.doneUnits);
      }

      if (book.totalUnits) {
        cy.contains(book.totalUnits);
      }
    });
  }

  protected abstract containsBook(book: IBookCheckData): Chainable<any>;
}

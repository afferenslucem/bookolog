import { BookListPo } from './book-list.po';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';
import Chainable = Cypress.Chainable;

export class InProgressListPo extends BookListPo {
  public constructor() {
    super('/in-progress');
  }

  public booksCountIs(count: number): void {
    cy.get('.in-progress-books-list').find('app-in-progress-book').should('have.length', count);
  }

  public lastBookIs(book: IBookCheckData): void {
    cy.get('.in-progress-books-list app-in-progress-book:first-child').as('book');

    if (book.name) {
      cy.get('@book').contains(book.name);
    }
    if (book.authors) {
      book.authors.forEach(item => cy.get('@book').contains(item));
    }
    if (book.started) {
      cy.get('@book').contains(book.started);
    }
    if (book.finished) {
      cy.get('@book').contains(book.finished);
    }
    if (book.doneUnits) {
      cy.get('@book').contains(book.doneUnits);
    }
    if (book.totalUnits) {
      cy.get('@book').contains(book.totalUnits);
    }
  }

  protected containsBook(book: IBookCheckData): Chainable<any> {
    return cy.contains('.in-progress-books-list app-in-progress-book', book.name);
  }
}

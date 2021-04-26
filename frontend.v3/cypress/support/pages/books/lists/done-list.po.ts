import { BookListPo } from './book-list.po';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';
import Chainable = Cypress.Chainable;

export class DoneListPo extends BookListPo {
  public constructor() {
    super('/done');
  }

  public booksCountIs(count: number): void {
    cy.get('.done-books-list').find('app-done-book').should('have.length', count);
  }

  public lastBookIs(book: IBookCheckData): void {
    cy.get('.done-books-list app-done-book:first-child').as('book');

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
  }

  protected containsBook(book: IBookCheckData): Chainable<any> {
    return cy.contains('.done-books-list app-done-book', book.name);
  }
}

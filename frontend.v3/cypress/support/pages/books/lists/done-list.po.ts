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

    cy.get('@book').contains(book.name);
    book.authors.forEach(item => cy.get('@book').contains(item));
    cy.get('@book').contains(book.started);
    cy.get('@book').contains(book.finished);
  }

  protected containsBook(book: IBookCheckData): Chainable<any> {
    return cy.contains('.done-books-list app-done-book', book.name);
  }
}

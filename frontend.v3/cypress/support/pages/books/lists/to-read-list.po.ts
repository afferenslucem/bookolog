import { BookListPo } from './book-list.po';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';
import Chainable = Cypress.Chainable;

export class ToReadListPo extends BookListPo {
  public constructor() {
    super('/to-read');
  }

  public booksCountIs(count: number): void {
    cy.get('.to-read-books-list').find('app-to-read-book').should('have.length', count);
  }

  public lastBookIs(book: IBookCheckData): void {
    cy.get('.to-read-books-list app-to-read-book:first-child').as('book');

    cy.get('@book').contains(book.name);
    book.authors.forEach(item => cy.get('@book').contains(item));
  }

  protected containsBook(book: IBookCheckData): Chainable<any> {
    return cy.contains('.to-read-books-list app-to-read-book', book.name);
  }
}

import { BookListPo } from './book-list.po';
import { IBookCheckData } from '../../../interfaces/i-book-check-data';

export class InProgressListPo extends BookListPo {
  public constructor() {
    super('/in-progress');
  }

  public booksCountIs(count: number): void {
    cy.get('.in-progress-books-list').find('app-in-progress-book').should('have.length', count);
  }

  public lastBookIs(book: IBookCheckData): void {
    cy.get('.in-progress-books-list app-in-progress-book:first-child').as('book');

    cy.get('@book').contains(book.name);
    book.authors.forEach(item => cy.get('@book').contains(item));
    cy.get('@book').contains(book.started);
    cy.get('@book').contains(book.finished);
    cy.get('@book').contains(book.doneUnits);
    cy.get('@book').contains(book.totalUnits);
  }
}

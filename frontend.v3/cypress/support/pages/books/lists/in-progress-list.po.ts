import { BookListPo } from './book-list.po';
import { IBook } from '../interfaces/i-book';

export class InProgressListPo extends BookListPo {
  public constructor() {
    super('/in-progress');
  }

  public booksCountIs(count: number): void {
    cy.get('.in-progress-books-list').find('app-in-progress-book').should('have.length', count);
  }

  public lastBookIs(book: IBook): void {
    cy.get('.in-progress-books-list app-in-progress-book:first-child').as('book');

    cy.get('@book').contains(book.name);
    book.authors.forEach(item => cy.get('@book').contains(item));
    cy.get('@book').contains('12.06.2020');
    cy.get('@book').contains('…');
    cy.get('@book').contains('07:50');
    cy.get('@book').contains('10:20');
  }
}

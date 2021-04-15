import { BookListPo } from './book-list.po';
import { IBook } from '../interfaces/i-book';

export class ToReadListPo extends BookListPo {
  public constructor() {
    super('/to-read');
  }

  public booksCountIs(count: number): void {
    cy.get('.to-read-books-list').find('app-to-read-book').should('have.length', count);
  }

  public lastBookIs(book: IBook): void {
    cy.get('.to-read-books-list app-to-read-book:first-child').as('book');

    cy.get('@book').contains(book.name);
    book.authors.forEach(item => cy.get('@book').contains(item));
  }
}

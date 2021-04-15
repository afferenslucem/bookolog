import { PageObject } from './page-object';

export abstract class BookListPo extends PageObject {
  protected constructor(url: string) {
    super(url);
  }

  public booksCountIs(count: number): void {
    cy.get('.in-progress-books-list').find('app-in-progress-book').should('have.length', count);
  }
}

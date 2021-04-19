import { PageObject } from '../../page-object';

export class AuthorsListPo extends PageObject {
  public constructor() {
    super('/authors');
  }

  public rowsCount(count: number): void {
    cy.get('app-author-list mat-list').find('mat-list-item').should('have.length', count);
  }

  public haveBooksForAuthor(genre: string, count: number): void {
    cy.get('app-author-list mat-list mat-list-item:first-child .statistic-item').as('item');

    cy.get('@item').get('.statistic-item__name').contains(genre.toString());
    cy.get('@item').get('.statistic-item__count').contains(count.toString());
  }
}

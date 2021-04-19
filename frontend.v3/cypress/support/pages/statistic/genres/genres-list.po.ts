import { PageObject } from '../../page-object';

export class GenresListPo extends PageObject {
  public constructor() {
    super('/genres');
  }

  public rowsCount(count: number): void {
    cy.get('app-genres-list mat-list').find('mat-list-item').should('have.length', count);
  }

  public haveBooksForGenre(genre: string, count: number): void {
    cy.get('app-genres-list mat-list mat-list-item:first-child .statistic-item').as('item');

    cy.get('@item').get('.statistic-item__name').contains(genre.toString());
    cy.get('@item').get('.statistic-item__count').contains(count.toString());
  }
}

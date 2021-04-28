import { SearchablePageObject } from '../searchable-page-object';

export class SeriesListPo extends SearchablePageObject {
  public constructor() {
    super('/series');
  }

  public itemCountIs(count: number): void {
    cy.get('app-collection-list mat-list').find('mat-list-item').should('have.length', count);
  }

  public seriesContainsBooksCount(name: string, count: number): void {
    cy.contains('app-collection-list mat-list mat-list-item .statistic-item__header', name).within(() =>
      cy.get('.actions span').contains(count.toString()),
    );
  }

  public seriesNotContains(name: string): void {
    cy.contains('app-collection-list mat-list mat-list-item .statistic-item__header', name).should('not.exist');
  }
}

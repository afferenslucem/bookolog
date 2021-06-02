import { SearchablePageObject } from '../searchable-page-object';

export class SeriesListPo extends SearchablePageObject {
  public constructor() {
    super('/series');
  }

  public itemCountIs(count: number): void {
    cy.get('app-collection-list ul').find('li').should('have.length', count);
  }

  public seriesContainsBooksCount(name: string, count: number): void {
    cy.contains('app-collection-list ul .statistic-item__header', name).within(() => cy.get('.actions span').contains(count.toString()));
  }

  public seriesNotContains(name: string): void {
    cy.contains('app-collection-list ul li .statistic-item__header', name).should('not.exist');
  }
}

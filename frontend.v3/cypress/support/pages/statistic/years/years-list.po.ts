import { PageObject } from '../../page-object';

export class YearsListPo extends PageObject {
  public constructor() {
    super('/years');
  }

  public rowsCount(count: number): void {
    cy.get('app-years-list ul').find('li').should('have.length', count);
  }

  public haveBooksForYear(year: number, count: number): void {
    cy.get('app-years-list ul .statistic-item:first-child').as('item');

    cy.get('@item').get('.statistic-item__name').contains(year.toString());
    cy.get('@item').get('.statistic-item__count').contains(count.toString());
  }
}

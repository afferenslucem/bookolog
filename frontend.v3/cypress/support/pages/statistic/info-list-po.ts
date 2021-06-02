import { SearchablePageObject } from '../searchable-page-object';

export class InfoListPo extends SearchablePageObject {
  public yearCount(count: number): void {
    cy.get('app-books-by-years ui-accordion').find('ui-expansion-panel').should('have.length', count);
  }

  public countBooksForYear(year: number, count: number): void {
    cy.get('app-books-by-years ui-accordion ui-expansion-panel ui-expansion-panel-header').contains(year.toString()).click();
    cy.get('app-books-by-years ui-accordion ui-expansion-panel ui-expansion-panel-body').find('app-done-book').should('have.length', count);
  }

  public containsBookWithName(bookName: string, year: number): void {
    cy.get('app-books-by-years ui-accordion ui-expansion-panel ui-expansion-panel-header').contains(year.toString()).click();
    cy.get('app-books-by-years ui-accordion ui-expansion-panel ui-expansion-panel-body').find('app-done-book').contains(bookName);
  }
}

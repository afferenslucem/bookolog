import { PageObject } from '../page-object';

export class InfoListPo extends PageObject {
  public yearCount(count: number): void {
    cy.get('app-books-by-years mat-accordion').find('mat-expansion-panel').should('have.length', count);
  }

  public countBooksForYear(year: number, count: number): void {
    cy.get('app-books-by-years mat-accordion mat-expansion-panel mat-expansion-panel-header').contains(year.toString()).click();
    cy.get('app-books-by-years mat-accordion mat-expansion-panel .mat-expansion-panel-body')
      .find('app-done-book')
      .should('have.length', count);
  }

  public containsBookWithName(bookName: string, year: number): void {
    cy.get('app-books-by-years mat-accordion mat-expansion-panel mat-expansion-panel-header').contains(year.toString()).click();
    cy.get('app-books-by-years mat-accordion mat-expansion-panel .mat-expansion-panel-body').find('app-done-book').contains(bookName);
  }
}

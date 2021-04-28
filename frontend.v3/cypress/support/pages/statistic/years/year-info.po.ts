import { SearchablePageObject } from '../../searchable-page-object';

export class YearInfoPo extends SearchablePageObject {
  public constructor(year: number) {
    super(`/year/${year}`);
  }

  public booksCount(count: number): void {
    cy.get('app-year-statistic').find('app-done-book').should('have.length', count);
  }

  public containsBookWithName(bookName: string): void {
    cy.get('app-year-statistic').find('app-done-book').contains(bookName);
  }
}

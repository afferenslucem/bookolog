import { PageObject } from '../page-object';

export class SeriesViewPo extends PageObject {
  public constructor(guid: string) {
    super(`/series/${guid}`);
  }

  public nameIs(name: string): void {
    cy.get('app-title').contains(name);
  }

  public descriptionIs(description: string): void {
    cy.get('app-collection .collection__description').contains(description);
  }
  public descriptionExists(): void {
    cy.get('app-collection .collection__description').should('exist');
  }
  public descriptionNotExists(): void {
    cy.get('app-collection .collection__description').should('not.exist');
  }

  public containsBook(name: string): void {
    cy.get('app-collection .book-list app-to-read-book').contains(name);
  }
}
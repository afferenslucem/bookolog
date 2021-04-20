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

  public delete(): void {
    cy.get('app-collection .collection__buttons .mat-warn').click();

    cy.intercept('DELETE', '**/collection/delete/**').as('delete');

    cy.get('app-collection-delete-dialog .mat-dialog-actions .delete').click();

    cy.wait('@delete').its('response.statusCode').should('be.eq', 200);
  }

  public containsBook(name: string): void {
    cy.get('app-collection .book-list app-to-read-book').contains(name);
  }
}

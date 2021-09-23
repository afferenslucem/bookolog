import { SearchablePageObject } from '../searchable-page-object';

export class SeriesViewPo extends SearchablePageObject {
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
    cy.get('app-collection .collection__buttons [color=danger]').click();

    cy.intercept('DELETE', '**/collection/delete/**').as('delete');

    cy.get('app-collection-delete-dialog ui-modal-bottom .delete').click();

    cy.wait('@delete').its('response.statusCode').should('be.eq', 200);
  }

  public containsBook(name: string): void {
    cy.get('app-collection .book-list app-to-read-book').contains(name);
  }

  public notContainsBook(name: string): void {
    cy.contains('app-collection .book-list app-to-read-book', name).should('not.exist');
  }
}

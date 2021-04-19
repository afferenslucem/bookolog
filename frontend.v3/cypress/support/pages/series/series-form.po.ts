import { PageObject } from '../page-object';

export class SeriesFormPo extends PageObject {
  public constructor(url: string) {
    super(url);
  }

  public clearName(): void {
    cy.get('app-collection-edit-view input.collection__name').clear();
  }

  public typeName(name: string): void {
    cy.get('app-collection-edit-view input.collection__name').type(name);
  }

  public clearDescription(): void {
    cy.get('app-collection-edit-view textarea.collection__description').clear();
  }

  public typeDescription(description: string): void {
    cy.get('app-collection-edit-view textarea.collection__description').type(description);
  }

  public setSyncInterceptor(): void {
    // cy.intercept('POST', '**/collection/synchronize').as('collectionSync');
  }

  public waitSync(): void {
    // cy.wait('@collectionSync').its('response.statusCode').should('be.oneOf', [200, 201]);
  }

  public clickSubmit(): void {
    cy.get('app-collection-edit-view button.submit').click();
  }
}

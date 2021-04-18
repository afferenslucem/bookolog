import { PageObject } from '../page-object';

export class SeriesCreatePo extends PageObject {
  public constructor() { super('/series/create'); }

  public typeName(name: string): void {
    cy.get('app-collection-edit-view input.collection__name').type(name);
  }

  public typeDescription(description: string): void {
    cy.get('app-collection-edit-view textarea.collection__description').type(description);
  }

  public clickSubmit(): void {
    cy.get('app-collection-edit-view button.submit').click();
  }
}

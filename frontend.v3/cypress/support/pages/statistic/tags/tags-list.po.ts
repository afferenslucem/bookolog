import { PageObject } from '../../page-object';

export class TagsListPo extends PageObject {
  public constructor() {
    super('/tags');
  }

  public rowsCount(count: number): void {
    cy.get('app-tags-list mat-list').find('mat-list-item').should('have.length', count);
  }

  public haveBooksForTag(genre: string, count: number): void {
    cy.get('app-tags-list mat-list mat-list-item:first-child .statistic-item').as('item');

    cy.get('@item').get('.statistic-item__name').contains(genre.toString());
    cy.get('@item').get('.statistic-item__count').contains(count.toString());
  }
}

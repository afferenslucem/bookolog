import { PageObject } from '../page-object';

export class BookViewPo extends PageObject {
  public constructor(guid: string) {
    super(`/book/${guid}`);
  }

  public nameIs(name: string): void {
    cy.get('app-book-view').get('.book__name').get('.property__value').contains(name);
  }

  public authorsIs(authors: string[]): void {
    authors.forEach(item => {
      cy.get('app-book-view').get('.book__authors').get('.property__value').contains(item);
    })
  }

  public yearIs(year: number): void {
    cy.get('app-book-view').get('.book__year').get('.property__value').contains(year.toString());
  }

  public typeIs(type: string): void {
    cy.get('app-book-view').get('.book__type').get('.property__value').contains(type);
  }

  public genreIs(genre: string): void {
    cy.get('app-book-view').get('.book__genre').get('.property__value').contains(genre);
  }

  public seriesIs(genre: string): void {
    cy.get('app-book-view').get('.book__collection').get('.property__value').contains(genre);
  }

  public statusIs(status: string): void {
    cy.get('app-book-view').get('.book__status').get('.property__value').contains(status);
  }

  public tagsIs(tags: string[]): void {
    tags.forEach(item => {
      cy.get('app-book-view')
        .get('.book__authors')
        .get('.property__value')
        .get('app-tag-value')
        .get('.tag__value')
        .contains(item);
    })
  }

  public startDateIs(year: number, month: number, day: number): void {
    cy.get('app-book-view').get('.book__start-date').get('.property__value').contains(`${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`);
  }

  public finishDateIs(year: number, month: number, day: number): void {
    cy.get('app-book-view').get('.book__end-date').get('.property__value').contains(`${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`);
  }
}

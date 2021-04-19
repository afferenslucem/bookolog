import { PageObject } from '../page-object';

export class BookViewPo extends PageObject {
  public constructor(guid: string) {
    super(`/book/${guid}`);
  }

  public nameIs(name: string): void {
    cy.get('app-book-view .book__name .property__value').contains(name);
  }

  public authorsIs(authors: string[]): void {
    authors.forEach(item => {
      cy.get('app-book-view .book__authors .property__value').contains(item);
    })
  }

  public yearIs(year: number): void {
    cy.get('app-book-view .book__year .property__value').contains(year.toString());
  }

  public typeIs(type: string): void {
    cy.get('app-book-view .book__type .property__value').contains(type);
  }

  public genreIs(genre: string): void {
    cy.get('app-book-view .book__genre .property__value').contains(genre);
  }

  public seriesIs(genre: string): void {
    cy.get('app-book-view .book__collection .property__value').contains(genre);
  }

  public statusIs(status: string): void {
    cy.get('app-book-view .book__status .property__value').contains(status);
  }

  public tagsIs(tags: string[]): void {
    tags.forEach(item => {
      cy.get('app-book-view .book__tags .property__value app-tag-value .tag__value')
        .contains(item);
    })
  }

  public startDateIs(year: number, month: number, day: number): void {
    cy.get('app-book-view .book__start-date .property__value').contains(`${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`);
  }

  public finishDateIs(year: number, month: number, day: number): void {
    cy.get('app-book-view .book__end-date .property__value').contains(`${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`);
  }
}
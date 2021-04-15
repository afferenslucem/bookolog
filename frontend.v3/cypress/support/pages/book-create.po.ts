import { PageObject } from './page-object';

export abstract class BookCreatePo extends PageObject {
  protected constructor(url: string) {
    super(url);
    cy.intercept('POST', '**/user/Synchronize').as('sync');
  }

  public typeName(name: string): void {
    cy.get('app-book-edit-view form.book input.book__name').type(name);
  }

  public typeAuthor(author: string): void {
    cy.get('app-book-edit-view form.book app-book-tags-input.book__authors .tags-input__form input.tag').type(author);
    cy.get('app-book-edit-view form.book app-book-tags-input.book__authors .tags-input__form button.submit').click();
  }

  public typeYear(year: number): void {
    cy.get('app-book-edit-view form.book input.book__year').type(year.toString());
  }

  public typeGenre(genre: string): void {
    cy.get('app-book-edit-view form.book input.book__genre').type(genre);
  }

  public typeTag(author: string): void {
    cy.get('app-book-edit-view form.book app-book-tags-input.book__tags .tags-input__form input.tag').type(author);
    cy.get('app-book-edit-view form.book app-book-tags-input.book__tags .tags-input__form button.submit').click();
  }

  public selectType(type: string): void {
    cy.get(`app-book-edit-view form.book .book__type`).click();
    cy.get('mat-option').contains(type).click();
  }

  public typeNotes(notes: string): void {
    cy.get(`app-book-edit-view form.book textarea.book__notes`).type(notes);
  }

  public clickSubmit(): void {
    cy.get(`app-book-edit-view form.book button.book__create-button`).click();
  }

  public waitSync(): void {
    cy.wait('@sync').its('response.statusCode').should('be.oneOf', [200, 201]);
  }
}

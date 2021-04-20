import { PageObject } from '../../page-object';

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

  public selectSeries(series: string): void {
    cy.get(`app-book-edit-view form.book .book__series`).click();
    cy.get('mat-option').contains(series).click();
  }

  public selectType(type: string): void {
    cy.get(`app-book-edit-view form.book .book__type`).click();
    cy.get('mat-option').contains(type).click();
  }

  public selectProgressType(progressType: string): void {
    cy.get(`app-book-edit-view form.book .book__progressType`).click();
    cy.get('mat-option').contains(progressType).click();
  }

  public typeAudioProgressDone(done: number): void {
    const hours = (done / 60) | 0;
    const minutes = done % 60;

    cy.get(`app-book-edit-view form.book app-book-time-input.book__doneUnits input.hours`).type(hours.toString());
    cy.get(`app-book-edit-view form.book app-book-time-input.book__doneUnits input.minutes`).type(minutes.toString());
  }

  public typeAudioProgressTotal(total: number): void {
    const hours = (total / 60) | 0;
    const minutes = total % 60;

    cy.get(`app-book-edit-view form.book app-book-time-input.book__totalUnits input.hours`).type(hours.toString());
    cy.get(`app-book-edit-view form.book app-book-time-input.book__totalUnits input.minutes`).type(minutes.toString());
  }

  public typePaperProgressDone(done: number): void {
    cy.get(`app-book-edit-view form.book input.book__doneUnits`).type(done.toString());
  }

  public typePaperProgressTotal(total: number): void {
    cy.get(`app-book-edit-view form.book input.book__totalUnits`).type(total.toString());
  }

  public typeStartedDate(year: number, month: number, day: number): void {
    cy.get(`app-book-edit-view form.book app-book-date-input.book__started input.year`).type(year.toString());
    cy.get(`app-book-edit-view form.book app-book-date-input.book__started input.month`).type(month.toString());
    cy.get(`app-book-edit-view form.book app-book-date-input.book__started input.day`).type(day.toString());
  }

  public typeFinishedDate(year: number, month: number, day: number): void {
    cy.get(`app-book-edit-view form.book app-book-date-input.book__finished input.year`).type(year.toString());
    cy.get(`app-book-edit-view form.book app-book-date-input.book__finished input.month`).type(month.toString());
    cy.get(`app-book-edit-view form.book app-book-date-input.book__finished input.day`).type(day.toString());
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

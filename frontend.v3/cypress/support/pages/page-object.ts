import { baseUrl } from '../constants';

export class PageObject {
  protected url: string;

  public constructor();
  public constructor(url: string);
  public constructor(url?: string) {
    this.url = url;
  }

  public visit(): void {
    cy.visit(this.url);
  }

  public isHere(): void {
    this.urlIs(this.url);
  }

  public hasTitle(title: string): void {
    cy.get('app-title').contains(title);
  }

  public setSyncInterceptor(): void {
    cy.intercept('POST', '**/user/Synchronize').as('sync');
  }

  public waitSync(): void {
    cy.wait('@sync').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.wait(1000);
  }

  public setMobileViewport(): void {
    cy.viewport(380, 680);
  }

  protected urlIs(address: string): void {
    cy.url().should('eq', baseUrl + address);
  }

  protected setViewport(width: number, height: number): void {
    cy.viewport(width, height);
  }
}

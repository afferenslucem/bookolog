import { baseUrl } from '../constants';

export abstract class PageObject {
  protected url: string;

  protected constructor(url: string) {
    this.url = url;
  }

  public visit(): void {
    this.setMobileViewport();
    cy.visit('/login');
  }

  public isHere(): void {
    this.urlIs(this.url);
  }

  protected setMobileViewport(): void {
    cy.viewport(380, 680);
  }

  protected urlIs(address: string): void {
    cy.url().should('eq', baseUrl + address);
  }

  protected setViewport(width: number, height: number): void {
    cy.viewport(width, height);
  }
}

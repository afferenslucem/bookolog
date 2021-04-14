import { PageObject } from './page-object';
import Chainable = Cypress.Chainable;

export class LoginPo extends PageObject {
  public constructor() {
    super('/login');
  }

  public typeLogin(login: string): void {
    cy.get('app-login form input.login').type(login);
  }

  public typePassword(password: string): void {
    cy.get('app-login form input.password').type(password);
  }

  public clickSubmit(): void {
    cy.get('app-login form button.submit').click();
  }

  public getError(): Chainable<JQuery> {
    return cy.get('app-login form mat-error span');
  }
}

import { PageObject } from '../page-object';
import Chainable = Cypress.Chainable;

export class RegistrationPo extends PageObject {
  public constructor() {
    super('/registration');
  }

  public typeLogin(login: string): void {
    cy.get('app-registration form input.login').type(login);
  }

  public typeEmail(email: string): void {
    cy.get('app-registration form input.email').type(email);
  }

  public typePassword(password: string): void {
    cy.get('app-registration form input.password').type(password);
  }

  public typeConfirmation(passwordConfirmation: string): void {
    cy.get('app-registration form input.password-confirmation').type(passwordConfirmation);
  }

  public clickSubmit(): void {
    cy.get('app-registration form button.submit').click();
  }

  public getError(): Chainable<JQuery> {
    return cy.get('app-registration form mat-error span');
  }
}

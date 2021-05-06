import { PageObject } from '../page-object';

export class RecoverPasswordPo extends PageObject {
  public constructor() {
    super('/recovery-password');
  }

  public typeEmail(email: string): void {
    cy.get('app-recover-password form input').type(email);
  }

  public clickSubmit(): void {
    cy.get('app-recover-password form button').click();
  }

  public interceptRequest(): void {
    cy.intercept('POST', '**/auth/recoverPassword').as('recover');
  }

  public waitRecover(): void {
    cy.wait('@recover').its('response.statusCode').should('be.eq', 200);
  }
}

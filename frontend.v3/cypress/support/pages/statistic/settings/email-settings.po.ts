import { SettingsPo } from './settings.po';

export class EmailSettingsPo extends SettingsPo {
  public constructor() {
    super();
  }

  public clearEmail(): void {
    cy.get('app-email-change ui-form-field input').clear();
  }

  public typeEmail(email: string): void {
    cy.get('app-email-change ui-form-field input').type(email);
  }

  public emailIs(email: string): void {
    cy.get('app-email-change ui-form-field input').should('have.value', email);
  }

  public submit(): void {
    cy.get('app-email-change button[type="submit"]').click();
  }

  public interceptEmailChange(): void {
    cy.intercept('POST', '**/user/changeEmail').as('changeEmail');
  }

  public waitServerAnswer(): void {
    cy.wait('@changeEmail').its('response.statusCode').should('be.eq', 200);
  }
}

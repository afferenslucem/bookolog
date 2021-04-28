import { SettingsPo } from './settings.po';

export class PasswordSettingsPo extends SettingsPo {
  public constructor() {
    super();
  }

  public clearCurrentPassword(): void {
    cy.get('app-password-change .current-password-field input').clear();
  }

  public typeCurrentPassword(currentPassword: string): void {
    cy.get('app-password-change .current-password-field input').type(currentPassword);
  }

  public clearNewPassword(): void {
    cy.get('app-password-change .new-password-field input').clear();
  }

  public typeNewPassword(newPassword: string): void {
    cy.get('app-password-change .new-password-field input').type(newPassword);
  }

  public clearConfirmationPassword(): void {
    cy.get('app-password-change .confirmation-password-field input').clear();
  }

  public typeConfirmationPassword(confirmationPassword: string): void {
    cy.get('app-password-change .confirmation-password-field input').type(confirmationPassword);
  }

  public submit(): void {
    cy.get('app-password-change button[type="submit"]').click();
  }

  public interceptPasswordChange(): void {
    cy.intercept('POST', '**/auth/changePassword').as('changePassword');
  }

  public waitServerAnswer(): void {
    cy.wait('@changePassword').its('response.statusCode').should('be.eq', 200);
  }
}

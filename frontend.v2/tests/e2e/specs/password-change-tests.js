// https://docs.cypress.io/api/introduction/api.html
import {credentials} from '../support/testing-data';

describe('Password change test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/login');

    cy.get('.profile').should('not.exist')
  });

  const passwordChange = credentials.passwordChangeAccount;

  it('Login/Logout test', () => {
    cy.login(passwordChange.username, passwordChange.password);

    cy.pageIs('workspace/in-progress');
    cy.get('.profile').should('exist')

    cy.goToSettings();
    cy.pageIs('workspace/settings');

    cy.changePassword(passwordChange.password, '12345678')

    cy.get('[name="password-change"] [type="submit"]').click();

    cy.wait(1000);

    cy.logout();

    cy.login(passwordChange.username, '12345678');
    
    cy.pageIs('workspace/in-progress');
  });
})

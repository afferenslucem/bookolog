// https://docs.cypress.io/api/introduction/api.html
import {credentials} from '../support/testing-data';

describe('Login test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/login');

    cy.get('.profile').should('not.exist')
  });

  const emptyCredentials = credentials.emptyUserAccount;

  it('Login/Logout test', () => {
    cy.login(emptyCredentials.username, emptyCredentials.password);

    cy.pageIs('workspace/in-progress');
    cy.get('.profile').should('exist')

    cy.logout();
    cy.pageIs('');
  });

  it('Wrong logout test', () => {
    cy.login(emptyCredentials.username, "wrongPassword");

    cy.get('.alert-danger').contains('Неверный логин или пароль.');
  });
})

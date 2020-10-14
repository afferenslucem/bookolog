// https://docs.cypress.io/api/introduction/api.html
import {credentials} from '../support/testing-data';

describe('Email change test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/login');

    cy.get('.profile').should('not.exist')
  });
  
  afterEach(() => {
    cy.reload();
    cy.logout();
  })

  const emailChange = credentials.emailChangeAccount;

  it('Email change test', () => {
    cy.login(emailChange.username, emailChange.password);

    cy.pageIs('me/in-progress');
    cy.get('.profile').should('exist')

    cy.goToSettings();
    cy.pageIs('me/settings');

    cy.get("#email-change").should('have.value', emailChange.email);
    cy.get("#email-change").clear();

    const newMail = 'new@mail.ru';

    cy.get("#email-change").type(newMail);

    cy.get('[name="email-change"] [type="submit"]').click();

    cy.wait(1000);

    cy.logout();

    cy.login(emailChange.username, emailChange.password);

    cy.goToSettings();

    cy.get("#email-change").should('have.value', newMail);
  });
})

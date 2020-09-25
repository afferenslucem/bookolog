// https://docs.cypress.io/api/introduction/api.html
import {credentials} from '../support/testing-data';

describe('Registration tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/registration');
  });

  it('New Account Registration', () => {
    const cred = credentials.newAccount;

    cy.fillRegistrationForm(cred);

    cy.get('[type="submit"]').click();
    
    cy.pageIs('login');
  });

  it('Account With Same Login Registration', () => {
    const cred = credentials.sameLoginAccount;

    cy.fillRegistrationForm(cred);

    cy.get('[type="submit"]').click();
    
    cy.get('.alert-danger').contains('Такой логин уже занят.');
  });

  it('Account With Same Email Registration', () => {
    const cred = credentials.sameEmailAccount;

    cy.fillRegistrationForm(cred);

    cy.get('[type="submit"]').click();
    
    cy.get('.alert-danger').contains('Такая почта уже занята.');
  });

  it('Account With Different Passwords Registration', () => {
    const cred = credentials.sameEmailAccount;

    cy.fillRegistrationForm(cred);
    cy.get(`#confirmation-registration`).type('123');

    cy.get('[type="submit"]').click();
    
    cy.get('.alert-danger').contains('Пароли не совпадают.');
  });
})

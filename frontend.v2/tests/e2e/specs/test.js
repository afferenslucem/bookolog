// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/login');
    cy.get('#login').type("admin");
    cy.get('#password').type("masterkey");
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.contains('h4', 'Читаю сейчас');
  })
})

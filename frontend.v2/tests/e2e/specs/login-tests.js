// https://docs.cypress.io/api/introduction/api.html

describe('Login test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  });

  it('Login/Logout test', () => {
    cy.visit('/login');

    cy.get('.profile').should('not.have.class', 'avatar');

    cy.login("admin", "masterkey");
    cy.wait(1000);

    cy.pageIs('workspace/in-progress');
    cy.get('.profile').should('have.class', 'avatar');
    cy.contains('h4', 'Читаю сейчас');

    cy.get('#booksLists').should('exist');

    cy.openToReadList();
    cy.contains('h4', 'Буду читать');

    cy.openToDoneList();
    cy.contains('h4', 'Прочитал');

    cy.openInProgressList();
    cy.contains('h4', 'Читаю сейчас');

    cy.logout();
    cy.pageIs('');
  });

  it('Wrong logout test', () => {
    cy.login("admin", "wrongPassword");

    cy.wait(1000);

    cy.get('.alert-danger').contains('Неверный логин или пароль.');
  });
})
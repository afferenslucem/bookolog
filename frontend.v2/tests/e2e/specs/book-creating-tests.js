// https://docs.cypress.io/api/introduction/api.html

import {books} from './testing-data';

describe('Login test', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.login("admin", "masterkey")
    cy.wait(1500);
  });

  it('Create to read book test', () => {
    cy.goToCreateToReadBook();

    cy.pageIs('workspace/book/create/0');

    cy.get('#status').should('have.value', '0')

    cy.fillToReadBookForm(books[0]);

    cy.compareToReadBookForm(books[0]);

    cy.get('[type="submit"]').click();

    cy.wait(1000);

    cy.pageIs('workspace/to-read');

    cy.compareBookLine(0, books[0]);

    cy.clickToBookLineHeader(0);

    cy.wait(1000);

    cy.urlContains('workspace/book/');

    cy.compareToReadBookVue(books[0]);

    cy.deleteBookFromView();

    cy.wait(1000);

    cy.pageIs('workspace/to-read');
  });

  it('Create done book test', () => {
    cy.goToCreateDoneBook();

    cy.pageIs('workspace/book/create/2');

    cy.get('#status').should('have.value', '2')

    cy.fillDoneBookForm(books[1]);

    cy.compareDoneBookForm(books[1]);

    cy.get('[type="submit"]').click();

    cy.wait(1000);

    cy.pageIs('workspace/done');

    cy.compareBookLine(0, books[1]);

    cy.clickToBookLineHeader(0);

    cy.wait(1000);

    cy.urlContains('workspace/book/');

    cy.compareDoneBookVue(books[1]);

    cy.deleteBookFromView();

    cy.wait(1000);

    cy.pageIs('workspace/done');
  });

  it('Create in progress book test', () => {
    cy.goToInProgressDoneBook();

    cy.pageIs('workspace/book/create/1');

    cy.get('#status').should('have.value', '1')

    cy.fillInProgressBookForm(books[2]);

    cy.compareInProgressBookForm(books[2]);

    cy.get('[type="submit"]').click();

    cy.wait(1000);

    cy.pageIs('workspace/in-progress');

    cy.compareBookLine(0, books[2]);

    cy.clickToBookLineHeader(0);

    cy.wait(1000);

    cy.urlContains('workspace/book/');

    cy.compareInProgressBookVue(books[2]);

    cy.deleteBookFromView();

    cy.wait(1000);

    cy.pageIs('workspace/in-progress');
  });
})

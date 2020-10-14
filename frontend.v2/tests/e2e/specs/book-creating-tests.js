// https://docs.cypress.io/api/introduction/api.html

import {books} from '../support/testing-data';
import {credentials} from '../support/testing-data';

describe('Book create test', () => {
  
  const emptyCredentials = credentials.emptyUserAccount;

  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.login(emptyCredentials.username, emptyCredentials.password);
  });

  afterEach(() => {
    cy.reload();
    cy.logout();
  })

  it('Create to read book test', () => {
    cy.goToCreateToReadBook();
    cy.pageIs('me/book/create/0');

    cy.get('#status').should('have.value', '0')

    const book = books[0];

    cy.fillToReadBookForm(book);
    cy.compareToReadBookForm(book);
    cy.get('.submit').click();

    cy.pageIs('me/to-read');
    cy.compareBookLine(0, book);

    cy.clickToFirstBookLineHeader();
    cy.urlContains('book/');

    cy.compareToReadBookVue(book);
    cy.deleteBookFromView();

    cy.pageIs('me/to-read');
  });

  it('Create done book test', () => {
    cy.goToCreateDoneBook();
    cy.pageIs('me/book/create/2');

    cy.get('#status').should('have.value', '2')

    cy.fillDoneBookForm(books[1]);
    cy.compareDoneBookForm(books[1]);
    cy.get('.submit').click();

    cy.pageIs('me/done');
    cy.compareBookLine(0, books[1]);
    cy.clickToFirstBookLineHeader();

    cy.urlContains('book/');
    cy.compareDoneBookVue(books[1]);
    cy.deleteBookFromView();

    cy.pageIs('me/done');
  });

  it('Create in progress book test', () => {
    cy.goToInProgressDoneBook();
    cy.pageIs('me/book/create/1');
    cy.get('#status').should('have.value', '1')

    cy.fillInProgressBookForm(books[2]);
    cy.compareInProgressBookForm(books[2]);
    cy.get('.submit').click();

    cy.pageIs('me/in-progress');
    cy.compareBookLine(0, books[2]);
    cy.clickToFirstBookLineHeader();

    cy.urlContains('book/');
    cy.compareInProgressBookVue(books[2]);
    cy.deleteBookFromView();

    cy.pageIs('me/in-progress');
  });
})

// https://docs.cypress.io/api/introduction/api.html

import {books} from '../support/testing-data';
import {credentials} from '../support/testing-data';

describe('Book edit test', () => {
  
  const fullCredentials = credentials.fullUserAccount;

  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.login(fullCredentials.username, fullCredentials.password);
  });

  afterEach(() => {    
    cy.reload();
    cy.logout();
  })

  it('Edit book test', () => {
    cy.goToReadingList();
    cy.pageIs('workspace/to-read');

    const bookStart = books[3];

    cy.clickToFirstBookLineHeader();
    cy.pageIs(`workspace/book/${bookStart.guid}`);
    cy.compareToReadBookVue(bookStart);

    cy.editBookFromView();

    const bookEnd = books[1];

    cy.get('#status').select(bookEnd.status.toString());

    cy.clearDoneForm();
    cy.fillDoneBookForm(bookEnd);

    cy.get('[type="submit"]').click();    
    cy.pageIs('workspace/done');

    cy.wait(2000);
    
    cy.compareBookLine(0, books[1]);
    
    cy.visit(`workspace/book/${bookStart.guid}`);

    cy.compareDoneBookVue(books[1]);
  });
})

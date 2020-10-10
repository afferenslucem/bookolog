import { credentials } from '../support/testing-data';

describe('Links Check', () => {
    beforeEach(() => {
        cy.viewport('iphone-6')
    });

    describe('Auth', () => {
        beforeEach(() => {
            cy.visit('/login');
            cy.get('.logo').click();
        });

        it('Login Page', () => {
            cy.get('.buttons .btn-primary').click();

            cy.pageIs('login');
        });

        it('Password Recover Page', () => {
            cy.get('.buttons .btn-primary').click();

            cy.get('.password-recover-link a').click();

            cy.pageIs('recover-password');
        });

        it('Registration Page', () => {
            cy.get('.buttons .btn-info').click();

            cy.pageIs('registration');
        });
    });

    describe('Lists', () => {
        const fullCredentials = credentials.fullUserAccount;

        beforeEach(() => {
            cy.login(fullCredentials.username, fullCredentials.password);

            cy.wait(1500);
        });

        afterEach(() => {
            cy.logout();
        })

        describe('In Progress', () => {
            it('List check', () => {
                cy.pageIs('workspace/in-progress');
            });

            it('Book View Check', () => {
                cy.pageIs('workspace/in-progress');

                cy.getFirstBookLine().click();

                cy.urlContains('workspace/book/');

                cy.editBookFromView();

                cy.urlContains('workspace/book/update/');
            });

            it('Book Edit View Check', () => {
                cy.pageIs('workspace/in-progress');

                cy.clickToFirstBookEditIcon();

                cy.urlContains('workspace/book/update/');
            });

        });

        describe('ToRead', () => {
            beforeEach(() => {
                cy.openToReadList();
            });

            it('List check', () => {
                cy.pageIs('workspace/to-read');
            });

            it('Book View Check', () => {
                cy.pageIs('workspace/to-read');

                cy.getFirstBookLine().click();

                cy.urlContains('workspace/book/');

                cy.editBookFromView();

                cy.urlContains('workspace/book/update/');
            });

            it('Book Edit View Check', () => {
                cy.pageIs('workspace/to-read');

                cy.clickToFirstBookEditIcon();

                cy.urlContains('workspace/book/update/');
            });
        });

        describe('Done', () => {
            beforeEach(() => {
                cy.openDoneList();
            });

            it('List check', () => {
                cy.pageIs('workspace/done');
            });

            it('Book View Check', () => {
                cy.pageIs('workspace/done');

                cy.getFirstBookLine().click();

                cy.urlContains('workspace/book/');

                cy.editBookFromView();

                cy.urlContains('workspace/book/update/');
            });

            it('Book Edit View Check', () => {
                cy.pageIs('workspace/done');

                cy.clickToFirstBookEditIcon();

                cy.urlContains('workspace/book/update/');
            });
        });

        describe('Genres', () => {
            beforeEach(() => {
                cy.openGenresList();
            });

            it('List check', () => {
                cy.pageIs('workspace/genres');

                cy.get('.genres-list ul li:first-child a').click();

                cy.urlContains('workspace/by-genre/');
            });
        });

        describe('Tags', () => {
            beforeEach(() => {
                cy.openTagsList();
            });

            it('List check', () => {
                cy.pageIs('workspace/tags');

                cy.get('.tags-list ul li:first-child a').click();

                cy.urlContains('workspace/by-tag/');
            });
        });

        describe('Authors', () => {
            beforeEach(() => {
                cy.openAuthorsList();
            });

            it('List check', () => {
                cy.pageIs('workspace/authors');

                cy.get('.authors-list ul li:first-child a').click();

                cy.urlContains('workspace/by-author/');
            });
        });
    })

    describe('Settings', () => {
        const emailChange = credentials.emailChangeAccount;

        beforeEach(() => {
            cy.login(emailChange.username, emailChange.password);

            cy.wait(1500);
        });

        afterEach(() => {
            cy.logout();
        })

        it('Email change test', () => {
            cy.goToSettings();
            cy.pageIs('workspace/settings');
        });
    });
});
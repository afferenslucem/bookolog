import capitalFirst from '../../../src/filters/capital-first';
import moment from 'moment';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("pageIs", (url) => {
    cy.url().should('eq', Cypress.config().baseUrl + url);
})

Cypress.Commands.add("urlContains", (url) => {
    cy.url().should('include', url);
})

Cypress.Commands.add("login", (username, password) => {
    cy.visit('/login');
    cy.get('#login').type(username);
    cy.get('#password').type(password);
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add("logout", () => {
    cy.get('.profile').click();
    cy.get('#logoutButton').click();
})

Cypress.Commands.add("goToSettings", () => {
    cy.get('.profile').click();
    cy.get('#settingsButton').click();
})

Cypress.Commands.add("openBooksMenu", () => {
    cy.get('#booksLists').click();
});

Cypress.Commands.add("openInProgressList", () => {
    cy.openBooksMenu();
    cy.get('#inProgressListButton').click();
})

Cypress.Commands.add("openToReadList", () => {
    cy.openBooksMenu();
    cy.get('#toReadListButton').click();
})

Cypress.Commands.add("openToDoneList", () => {
    cy.openBooksMenu();
    cy.get('#toDoneListButton').click();
})

Cypress.Commands.add("goToCreateToReadBook", () => {
    cy.openBooksMenu();
    cy.get('.nav-item.to-read > .icon.nav-link').click();
})

Cypress.Commands.add("goToCreateDoneBook", () => {
    cy.openBooksMenu();
    cy.get('.nav-item.done > .icon.nav-link').click();
})

Cypress.Commands.add("goToInProgressDoneBook", () => {
    cy.openBooksMenu();
    cy.get('.nav-item.in-progress > .icon.nav-link').click();
})

function fillCommonForm(book) {
    cy.get('#name').type(book.name);
    cy.get('#authors').type(book.authors.join(', '));
    cy.get('#genre').type(book.genre);
    cy.get('#tags').type(book.tags.join(', '));
    cy.get('#type').select(book.type.toString());
    cy.get('#note').type(book.note);
}

Cypress.Commands.add("fillToReadBookForm", (book) => {
    fillCommonForm(book);
});

Cypress.Commands.add("fillDoneBookForm", (book) => {
    fillCommonForm(book);
    cy.get('.start-date #year').type(book.startDateYear);
    cy.get('.start-date #month').type(book.startDateMonth);
    cy.get('.start-date #day').type(book.startDateDay);

    cy.get('.end-date #year').type(book.endDateYear);
    cy.get('.end-date #month').type(book.endDateMonth);
    cy.get('.end-date #day').type(book.endDateDay);
});

Cypress.Commands.add("fillUnits", (name, type, value) => {
    if(type == 2) {
        const hours = Math.trunc(value / 60);
        const minutes = value % 60;

        cy.get(`${name} .hours`).type(hours);
        cy.get(`${name} .minutes`).type(minutes);
    } else {
        cy.get(name).type(value);
    }
})

Cypress.Commands.add("fillInProgressBookForm", (book) => {
    fillCommonForm(book);
    cy.fillUnits('#doneUnits', book.type, book.doneUnits);
    cy.fillUnits('#totalUnits', book.type, book.totalUnits);
    
    cy.get('.start-date #year').type(book.startDateYear);
    cy.get('.start-date #month').type(book.startDateMonth);
    cy.get('.start-date #day').type(book.startDateDay);
});

function clearCommonForm() {
    cy.get('#name').clear();
    cy.get('#authors').clear();
    cy.get('#genre').clear();
    cy.get('#tags').clear();
    //cy.get('#type').clear();
    cy.get('#note').clear();
}

Cypress.Commands.add("clearDoneForm", () => {
    clearCommonForm();

    cy.get('.start-date #year').clear();
    cy.get('.start-date #month').clear();
    cy.get('.start-date #day').clear();

    cy.get('.end-date #year').clear();
    cy.get('.end-date #month').clear();
    cy.get('.end-date #day').clear();
});

function compareCommonForm(book) {
    cy.get('#name').should('have.value', book.name);
    cy.get('#authors').should('have.value', book.authors.join(', '));
    cy.get('#genre').should('have.value', book.genre);
    cy.get('#tags').should('have.value', book.tags.join(', '));
    cy.get('#type').should('have.value', book.type.toString());
    cy.get('#note').should('have.value', book.note);
}

Cypress.Commands.add("compareToReadBookForm", (book) => {
    compareCommonForm(book);
    cy.get('#status').should('have.value', '0');
});

Cypress.Commands.add("compareDoneBookForm", (book) => {
    compareCommonForm(book);
    cy.get('#status').should('have.value', '2');

    cy.get('.start-date #year').should('have.value', book.startDateYear);
    cy.get('.start-date #month').should('have.value', book.startDateMonth);
    cy.get('.start-date #day').should('have.value', book.startDateDay);

    cy.get('.end-date #year').should('have.value', book.endDateYear);
    cy.get('.end-date #month').should('have.value', book.endDateMonth);
    cy.get('.end-date #day').should('have.value', book.endDateDay);
});

Cypress.Commands.add("compareUnits", (name, type, value) => {
    if(type == 2) {
        const hours = Math.trunc(value / 60);
        const minutes = value % 60;

        cy.get(`${name} .hours`).should('have.value', hours.toString());
        cy.get(`${name} .minutes`).should('have.value', minutes.toString());
    } else {
        cy.get(name).should('have.value', value.toString());
    }
})

Cypress.Commands.add("compareInProgressBookForm", (book) => {
    compareCommonForm(book);
    cy.get('#status').should('have.value', '1');
    cy.compareUnits('#doneUnits', book.type, book.doneUnits);
    cy.compareUnits('#totalUnits', book.type, book.totalUnits);
    
    cy.get('.start-date #year').should('have.value', book.startDateYear);
    cy.get('.start-date #month').should('have.value', book.startDateMonth);
    cy.get('.start-date #day').should('have.value', book.startDateDay);
});

function compareCommonView(book) {
    cy.get('h4').contains(book.name);
    cy.get('.authors').contains(book.authors.join(', '));

    switch(book.type) {
        case 0: {
            cy.get('.book-type').contains('Бумажная книга');
            break;
        }
        case 1: {
            cy.get('.book-type').contains('Электронная книга');
            break;
        }
        case 2: {
            cy.get('.book-type').contains('Аудиокнига');
            break;
        }
    }

    cy.get('.genre').contains(capitalFirst(book.genre));
    cy.get('.tags').contains(book.tags.map(item => capitalFirst(item)).join(', '));

    if(!!book.note) {
        cy.get('.note').contains(book.note);
    }
}

Cypress.Commands.add("compareToReadBookVue", (book) => {
    compareCommonView(book);
    cy.get('.progressing-bar').should('not.exist');
    cy.get('.start-date').should('not.exist');
    cy.get('.end-date').should('not.exist');
    cy.get('.status').contains('К прочтению');
});

Cypress.Commands.add("compareDoneBookVue", (book) => {
    compareCommonView(book);
    cy.get('.progressing-bar').should('not.exist');
    cy.get('.start-date').contains(moment(book.startDate).format('ll'));
    cy.get('.end-date').contains(moment(book.endDate).format('ll'));
    cy.get('.status').contains('Прочитана');
});

Cypress.Commands.add("compareInProgressBookVue", (book) => {
    compareCommonView(book);
    cy.get('.progressing-bar').should('exist');
    cy.get('.start-date').contains(moment(book.startDate).format('ll'));
    cy.get('.end-date').should('not.exist');
    cy.get('.status').contains('Читаю');
});

Cypress.Commands.add("compareBookLine", (index, book) => {
    const line = cy.get(`.book-line:nth-child(${index + 1})`);
    line.get('.header').contains(book.name)
    line.get('span').contains(book.authors.join(', '));
});

Cypress.Commands.add("clickToFirstBookLineHeader", () => {
    cy.get(`.book-list ul:first-of-type > li:first-child > .book-line > .header > strong`).click();
});

Cypress.Commands.add("deleteBookFromView", () => {
    cy.get(`[data-target="#bookDeleteModal"]`).click();

    cy.get(`#bookDeleteModal .btn-danger`).click();
});

Cypress.Commands.add("editBookFromView", () => {
    cy.get(`#editBookButton`).click();
});

Cypress.Commands.add("goToReadingList", () => {
    cy.get(`#booksLists`).click();

    cy.get(`#toReadListButton`).click();
});

Cypress.Commands.add("changePassword", (oldPassword, newPassword) => {
    cy.get(`#old-password-change`).type(oldPassword);
    cy.get(`#password-change`).type(newPassword);
    cy.get(`#confirmation-change`).type(newPassword);
});

Cypress.Commands.add("fillRegistrationForm", (credentials) => {
    cy.get(`#login-registration`).type(credentials.username);
    cy.get(`#email-registration`).type(credentials.email);
    cy.get(`#password-registration`).type(credentials.password);
    cy.get(`#confirmation-registration`).type(credentials.password);
});
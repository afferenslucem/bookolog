/// <reference types="cypress" />

import * as users from '../../fixtures/users.json';
import * as books from '../../fixtures/books.json';
import { ToReadBookCreatePo } from '../../support/pages/to-read-book-create.po';
import { IUser } from '../../support/interfaces/i-user';
import { loginAs, logout } from '../../support/routines';
import { IBook } from '../../support/interfaces/i-book';
import { ToReadListPo } from '../../support/pages/to-read-list.po';

context('ToReadBookCreate', () => {
  let formPage: ToReadBookCreatePo = null;
  let toReadPage: ToReadListPo = null;

  beforeEach(() => {
    const creator: IUser = users.bookCreateCheck;
    loginAs(creator);

    toReadPage = new ToReadListPo();
    formPage = new ToReadBookCreatePo();
    formPage.visit();
  });

  afterEach(() => {
    logout();
  });

  it('page should exists', () => {
    formPage.isHere();
  });

  it('should create toRead book', () => {
    const book: IBook = books.AgeOfDeathBeginning;

    formPage.typeName(book.name);
    book.authors.forEach(item => formPage.typeAuthor(item));
    formPage.typeYear(book.year);
    formPage.typeGenre(book.genre);
    book.tags.forEach(item => formPage.typeTag(item));
    formPage.selectType(book.type);
    formPage.typeNotes(book.notes);
    formPage.clickSubmit();
    formPage.waitSync();

    toReadPage.isHere();

    toReadPage.booksCountIs(1);
    toReadPage.lastBookIs(book);
  });
});

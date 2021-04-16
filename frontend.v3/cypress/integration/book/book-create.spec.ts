/// <reference types="cypress" />

import * as users from '../../fixtures/users.json';
import * as books from '../../fixtures/books.json';
import { ToReadBookCreatePo } from '../../support/pages/to-read-book-create.po';
import { IUser } from '../../support/interfaces/i-user';
import { loginAs, logout } from '../../support/routines';
import { IBook } from '../../support/interfaces/i-book';
import { ToReadListPo } from '../../support/pages/to-read-list.po';
import { InProgressListPo } from '../../support/pages/in-progress-list.po';
import { InProgressBookCreatePo } from '../../support/pages/in-progress-book-create.po';

context('ToReadBookCreate', () => {
  beforeEach(() => {
    const creator: IUser = users.bookCreateCheck;
    loginAs(creator);
  });

  afterEach(() => {
    logout();
  });

  context('toRead', () => {
    let formPage: ToReadBookCreatePo = null;
    let toReadListPage: ToReadListPo = null;

    beforeEach(() => {
      toReadListPage = new ToReadListPo();
      formPage = new ToReadBookCreatePo();
      formPage.visit();
    });

    it('page should exists', () => {
      formPage.isHere();
    });

    it('should create book', () => {
      const book: IBook = books.ageOfDeathBeginning;

      formPage.typeName(book.name);
      book.authors.forEach(item => formPage.typeAuthor(item));
      formPage.typeYear(book.year);
      formPage.typeGenre(book.genre);
      book.tags.forEach(item => formPage.typeTag(item));
      formPage.selectType(book.type);
      formPage.typeNotes(book.notes);
      formPage.clickSubmit();
      formPage.waitSync();

      toReadListPage.isHere();

      toReadListPage.booksCountIs(1);
      toReadListPage.lastBookIs(book);
    });
  });

  context('inProgress', () => {
    let formPage: InProgressBookCreatePo = null;
    let inProgressListPage: InProgressListPo = null;

    beforeEach(() => {
      inProgressListPage = new InProgressListPo();
      formPage = new InProgressBookCreatePo();
      formPage.visit();
    });

    it('page should exists', () => {
      formPage.isHere();
    });

    it('should create book', () => {
      const book: IBook = books.earthOfRedundant;

      formPage.typeName(book.name);
      book.authors.forEach(item => formPage.typeAuthor(item));
      formPage.typeYear(book.year);
      formPage.typeGenre(book.genre);
      book.tags.forEach(item => formPage.typeTag(item));
      formPage.selectType(book.type);
      formPage.selectProgressType(book.progressType);
      formPage.typeAudioProgressDone(book.doneUnits);
      formPage.typeAudioProgressTotal(book.totalUnits);
      formPage.typeStartedDate(book.startYear, book.startMonth, book.startDay);
      formPage.typeNotes(book.notes);
      formPage.clickSubmit();
      formPage.waitSync();

      inProgressListPage.isHere();

      inProgressListPage.booksCountIs(1);
      inProgressListPage.lastBookIs(book);
    });
  });
});

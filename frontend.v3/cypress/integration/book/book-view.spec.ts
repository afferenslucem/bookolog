/// <reference types="cypress" />

import * as users from '../../fixtures/users.json';
import * as books from '../../fixtures/books.json';
import { ToReadBookCreatePo } from '../../support/pages/books/forms/to-read-book-create.po';
import { IUser } from '../../support/interfaces/i-user';
import { createDoneBook, loginAs, logout } from '../../support/routines';
import { IBook } from '../../support/interfaces/i-book';
import { ToReadListPo } from '../../support/pages/books/lists/to-read-list.po';
import { InProgressListPo } from '../../support/pages/books/lists/in-progress-list.po';
import { InProgressBookCreatePo } from '../../support/pages/books/forms/in-progress-book-create.po';
import { DoneBookCreatePo } from '../../support/pages/books/forms/done-book-create.po';
import { DoneListPo } from '../../support/pages/books/lists/done-list.po';
import { IBookCheckData } from '../../support/interfaces/i-book-check-data';
import { YearsListPo } from '../../support/pages/statistic/years/years-list.po';
import { GenresListPo } from '../../support/pages/statistic/genres/genres-list.po';
import { AuthorsListPo } from '../../support/pages/statistic/authors/authors-list.po';
import { TagsListPo } from '../../support/pages/statistic/tags/tags-list.po';
import { BookViewPo } from '../../support/pages/books/book-view.po';

context('BookView', () => {
  beforeEach(() => {
    const viewCheck: IUser = users.hrodvitnir;
    loginAs(viewCheck);
  });

  afterEach(() => {
    logout();
  });

  context('toRead', () => {
    let bookView: BookViewPo = null;

    beforeEach(() => {
      bookView = new BookViewPo('dce0d8ed-d71d-42e0-87cc-593b7f53c1e7');
      bookView.visit();
    });

    it('page of toRead should exists', () => {
      bookView.isHere();
    });

    it('should correctly fill toRead book', () => {
      const book: IBook = books.amberTelescope;

      bookView.nameIs(book.name);
      bookView.authorsIs(book.authors);
      bookView.yearIs(book.year);
      bookView.typeIs(book.type);
      bookView.genreIs(book.genre);
      bookView.seriesIs(book.series);
      bookView.statusIs(book.status);
      bookView.tagsIs(book.tags);
    });
  });

  context('inProgress', () => {
    let bookView: BookViewPo = null;

    beforeEach(() => {
      bookView = new BookViewPo('177b2b7d-d1dc-455a-89f1-37c5208b7728');
      bookView.visit();
    });

    it('page of inProgress book should exists', () => {
      bookView.isHere();
    });

    it('should correctly fill inProgress book', () => {
      const book: IBook = books.humans;

      bookView.nameIs(book.name);
      bookView.authorsIs(book.authors);
      bookView.typeIs(book.type);
      bookView.genreIs(book.genre);
      bookView.seriesIs(book.series);
      bookView.statusIs(book.status);
      bookView.tagsIs(book.tags);
      bookView.startDateIs(book.startYear, book.startMonth, book.startDay)
    });
  });

  context('done', () => {
    let bookView: BookViewPo = null;

    beforeEach(() => {
      bookView = new BookViewPo('757a6143-5e76-448d-8100-f032f9e03de3');
      bookView.visit();
    });

    it('page of done book should exists', () => {
      bookView.isHere();
    });

    it('should correctly fill done book', () => {
      const book: IBook = books.shortSummer;

      bookView.nameIs(book.name);
      bookView.authorsIs(book.authors);
      bookView.typeIs(book.type);
      bookView.genreIs(book.genre);
      bookView.seriesIs(book.series);
      bookView.statusIs(book.status);
      bookView.tagsIs(book.tags);
      bookView.startDateIs(book.startYear, book.startMonth, book.startDay)
      bookView.finishDateIs(book.finishYear, book.finishMonth, book.finishDay)
    });
  });
});

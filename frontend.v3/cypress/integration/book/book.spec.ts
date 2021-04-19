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
import { PageObject } from '../../support/pages/page-object';

context('Book', () => {
  beforeEach(() => {
    new PageObject().setMobileViewport();
  });

  afterEach(() => {
    logout();
  });

  context('Create', () => {
    beforeEach(() => {
      const creator: IUser = users.bookCreateCheck;
      loginAs(creator);
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

        formPage.setSyncInterceptor();
        formPage.clickSubmit();
        formPage.waitSync();

        toReadListPage.isHere();

        const expected: IBookCheckData = {
          name: book.name,
          authors: book.authors,
        };

        toReadListPage.booksCountIs(1);
        toReadListPage.lastBookIs(expected);
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

        formPage.setSyncInterceptor();
        formPage.clickSubmit();
        formPage.waitSync();

        inProgressListPage.isHere();

        inProgressListPage.booksCountIs(1);

        const expected: IBookCheckData = {
          name: book.name,
          authors: book.authors,
          started: '12.06.2020',
          finished: '…',
          doneUnits: '07:50',
          totalUnits: '10:20',
        };

        inProgressListPage.lastBookIs(expected);
      });
    });

    context('Done', () => {
      let formPage: DoneBookCreatePo = null;
      let doneListPage: DoneListPo = null;

      beforeEach(() => {
        doneListPage = new DoneListPo();
        formPage = new DoneBookCreatePo();
        formPage.visit();
      });

      it('page should exists', () => {
        formPage.isHere();
      });

      it('should create book', () => {
        const book: IBook = books.khmelAndKlondayk;

        createDoneBook(book);

        // Проверка списка прочитанных
        doneListPage.isHere();
        doneListPage.booksCountIs(1);
        const expected: IBookCheckData = {
          name: book.name,
          authors: book.authors,
          started: '13.07.2020',
          finished: '18.08.2021',
        };
        doneListPage.lastBookIs(expected);

        // Проверка списка прочтений по годам
        const yearsList = new YearsListPo();
        yearsList.visit();
        yearsList.rowsCount(1);
        yearsList.haveBooksForYear(book.finishYear, 1);

        // Проверка списка прочтений по жанрам
        const genresList = new GenresListPo();
        genresList.visit();
        genresList.rowsCount(1);
        genresList.haveBooksForGenre(book.genre, 1);

        // Проверка списка прочтений по авторам
        const authorList = new AuthorsListPo();
        authorList.visit();
        authorList.rowsCount(2);
        book.authors.forEach(item => authorList.haveBooksForAuthor(item, 1));

        // Проверка списка прочтений по тегам
        const tagsList = new TagsListPo();
        tagsList.visit();
        tagsList.rowsCount(4);
        book.tags.forEach(item => tagsList.haveBooksForTag(item, 1));
      });
    });
  });

  context('View', () => {
    beforeEach(() => {
      const viewCheck: IUser = users.hrodvitnir;
      loginAs(viewCheck);
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
        bookView.startDateIs(book.startYear, book.startMonth, book.startDay);
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
        bookView.startDateIs(book.startYear, book.startMonth, book.startDay);
        bookView.finishDateIs(book.finishYear, book.finishMonth, book.finishDay);
      });
    });
  });
});

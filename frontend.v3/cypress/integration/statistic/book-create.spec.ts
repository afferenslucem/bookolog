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
import { YearInfoPo } from '../../support/pages/statistic/years/year-info.po';

context('Statistic', () => {
  beforeEach(() => {
    const user: IUser = users.hrodvitnir;
    loginAs(user);
  });

  afterEach(() => {
    logout();
  });

  context('Year', () => {
    let yearInfo: YearInfoPo = null;

    beforeEach(() => {
      yearInfo = new YearInfoPo(2015);
      yearInfo.visit();
    });

    it('page should exists', () => {
      yearInfo.isHere();
    });

    it('page should has custom title', () => {
      yearInfo.hasTitle('2015');
    });

    it('page should has 6 books', () => {
      yearInfo.booksCount(6);
    });

    it('page should has all books', () => {
      yearInfo.containsBookWithName('Звонок');
      yearInfo.containsBookWithName('Евгений Онегин');
      yearInfo.containsBookWithName('Бойцовский клуб');
      yearInfo.containsBookWithName('Не спешу');
      yearInfo.containsBookWithName('В списках не значился');
      yearInfo.containsBookWithName('Изгоняющий дьявола');
    });
  });
});

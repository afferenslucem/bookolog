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
import { GenreInfoPo } from '../../support/pages/statistic/genres/genre-info.po';
import { AuthorsInfoPo } from '../../support/pages/statistic/authors/author-info.po';
import { TagInfoPo } from '../../support/pages/statistic/tags/tag-info.po';
import { SeriesListPo } from '../../support/pages/series/series-list.po';
import { SeriesViewPo } from '../../support/pages/series/seriesViewPo';

context('Series', () => {

  beforeEach(() => {
    const user: IUser = users.hrodvitnir;
    loginAs(user);
  });

  afterEach(() => {
    logout();
  });

  context('List', () => {
    let page = new SeriesListPo();

    beforeEach(() => {
      page.visit();
    });

    it('page should exists', () => {
      page.isHere();
    });

    it('items count should be 16', () => {
      page.itemCountIs(16);
    });

    it('counts should be correct', () => {
      page.seriesContainsBooksCount('Акулы из стали', 6);
      page.seriesContainsBooksCount('Гарри Поттер', 8);
      page.seriesContainsBooksCount('S.T.A.L.K.E.R.', 50);
      page.seriesContainsBooksCount('Я! Еду! Домой!', 3);
    });
  });

  context('View', () => {
    let page = new SeriesViewPo('02bbf997-8766-427d-b0a1-6679dd41b7ef');

    beforeEach(() => {
      page.visit();
    });

    it('page should exists', () => {
      page.isHere();
    });

    it('should render correct', () => {
      page.nameIs('Эпоха мертвых');
      page.descriptionIs('История одного зомби-апокалипсиса в Москве');
      page.containsBook('Начало');
      page.containsBook('Москва');
      page.containsBook('Прорыв');
    });
  });
})

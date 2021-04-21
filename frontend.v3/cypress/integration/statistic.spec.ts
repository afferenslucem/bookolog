/// <reference types="cypress" />

import * as users from '../fixtures/users.json';
import { IUser } from '../support/interfaces/i-user';
import { loginAs, logout } from '../support/routines';
import { YearInfoPo } from '../support/pages/statistic/years/year-info.po';
import { GenreInfoPo } from '../support/pages/statistic/genres/genre-info.po';
import { AuthorsInfoPo } from '../support/pages/statistic/authors/author-info.po';
import { TagInfoPo } from '../support/pages/statistic/tags/tag-info.po';
import { PageObject } from '../support/pages/page-object';

context('Statistic', () => {
  beforeEach(() => {
    new PageObject().setMobileViewport();
  });

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

  context('Genre', () => {
    let genreInfo: GenreInfoPo = null;

    beforeEach(() => {
      genreInfo = new GenreInfoPo('детектив');
      genreInfo.visit();
    });

    it('page should exists', () => {
      genreInfo.isHere();
    });

    it('page should has custom title', () => {
      genreInfo.hasTitle('Детектив');
    });

    it('page should has 4 years', () => {
      genreInfo.yearCount(4);
    });

    it('page should has books for years', () => {
      genreInfo.countBooksForYear(2019, 2);
      genreInfo.countBooksForYear(2017, 1);
      genreInfo.countBooksForYear(2014, 1);
      genreInfo.countBooksForYear(2013, 1);
    });

    it('page should has books for year', () => {
      genreInfo.containsBookWithName('Дремлющий демон Декстера', 2019);
      genreInfo.containsBookWithName('Молчание ягнят', 2019);
      genreInfo.containsBookWithName('Девушка в поезде', 2017);
    });
  });

  context('Author', () => {
    let authorInfo: AuthorsInfoPo = null;

    beforeEach(() => {
      authorInfo = new AuthorsInfoPo('Дмитрий Глуховский');
      authorInfo.visit();
    });

    it('page should exists', () => {
      authorInfo.isHere();
    });

    it('page should has custom title', () => {
      authorInfo.hasTitle('Дмитрий Глуховский');
    });

    it('page should has 3 years', () => {
      authorInfo.yearCount(3);
    });

    it('page should has books for years', () => {
      authorInfo.countBooksForYear(2021, 1);
      authorInfo.countBooksForYear(2020, 3);
      authorInfo.countBooksForYear(2012, 2);
    });

    it('page should has books for year', () => {
      authorInfo.containsBookWithName('Метро 2034', 2020);
      authorInfo.containsBookWithName('Метро 2035', 2020);
      authorInfo.containsBookWithName('Пост (Сезон 1)', 2020);
    });
  });

  context('Tag', () => {
    let tagInfo: TagInfoPo = null;

    beforeEach(() => {
      tagInfo = new TagInfoPo('JavaScript');
      tagInfo.visit();
    });

    it('page should exists', () => {
      tagInfo.isHere();
    });

    it('page should has custom title', () => {
      tagInfo.hasTitle('JavaScript');
    });

    it('page should has 2 years', () => {
      tagInfo.yearCount(2);
    });

    it('page should has books for years', () => {
      tagInfo.countBooksForYear(2020, 3);
      tagInfo.countBooksForYear(2019, 4);
    });

    it('page should has books for year', () => {
      tagInfo.containsBookWithName('Введение в ESMAScript 6', 2020);
      tagInfo.containsBookWithName('Vue.js в действии', 2020);
      tagInfo.containsBookWithName('Как устроен javascript', 2020);
    });
  });
});

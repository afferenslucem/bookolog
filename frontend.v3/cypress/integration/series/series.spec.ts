/// <reference types="cypress" />

import * as users from '../../fixtures/users.json';
import * as series from '../../fixtures/series.json';
import { IUser } from '../../support/interfaces/i-user';
import { loginAs, logout } from '../../support/routines';
import { SeriesListPo } from '../../support/pages/series/series-list.po';
import { SeriesViewPo } from '../../support/pages/series/series-view.po';
import { SeriesCreatePo } from '../../support/pages/series/series-create.po';
import { ISeries } from '../../support/interfaces/i-series';

context('Series', () => {

  afterEach(() => {
    logout()
  })

  context('Create', () => {
    let form: SeriesCreatePo = null;

    beforeEach(() => {
      const user: IUser = users.seriesCreateCheck;
      loginAs(user);
      form = new SeriesCreatePo();
      form.visit();
    })

    it('create form exists', () => {
      form.isHere();
    });

    it('should create series', () => {
      const seriesEntity: ISeries = series.harryPotter;

      form.typeName(seriesEntity.name);
      form.typeDescription(seriesEntity.description);
      form.clickSubmit();

      new SeriesListPo().seriesContainsBooksCount(seriesEntity.name, 0);
    });
  });

  context('List', () => {

    let page = new SeriesListPo();
    beforeEach(() => {
      const user: IUser = users.hrodvitnir;
      loginAs(user);
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
      const user: IUser = users.hrodvitnir;
      loginAs(user);
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

/// <reference types="cypress" />

import * as users from '../../fixtures/users.json';
import * as series from '../../fixtures/series.json';
import { IUser } from '../../support/interfaces/i-user';
import { loginAs, logout } from '../../support/routines';
import { SeriesListPo } from '../../support/pages/series/series-list.po';
import { SeriesViewPo } from '../../support/pages/series/series-view.po';
import { SeriesCreatePo } from '../../support/pages/series/series-create.po';
import { ISeries } from '../../support/interfaces/i-series';
import { SeriesUpdatePo } from '../../support/pages/series/series-update.po';
import { PageObject } from '../../support/pages/page-object';

context('Series', () => {
  beforeEach(() => {
    new PageObject().setMobileViewport();
  });

  afterEach(() => {
    logout();
  });

  context('Create', () => {
    let form: SeriesCreatePo = null;

    beforeEach(() => {
      const user: IUser = users.seriesCreateCheck;
      loginAs(user);
      form = new SeriesCreatePo();
      form.visit();
    });

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

  context('Update', () => {
    let form: SeriesUpdatePo = null;

    beforeEach(() => {
      const user: IUser = users.hrodvitnir;
      loginAs(user);
      form = new SeriesUpdatePo('0e5930fd-8477-4311-9e00-2eb73bda6fa5');
      form.visit();
    });

    it('page should exists', () => {
      form.isHere();
    });

    it('page should reset description', () => {
      const seriesData: ISeries = series.khmelAndKlondayk;

      form = new SeriesUpdatePo('d9bd7f71-4d18-4a77-b9be-1fcc0e1e9c73');
      form.visit();
      form.isHere();

      form.clearName();
      form.typeName(seriesData.name);

      form.clearDescription();

      form.setSyncInterceptor();
      form.clickSubmit();
      form.waitSync();

      // Series check
      const page = new SeriesViewPo('d9bd7f71-4d18-4a77-b9be-1fcc0e1e9c73');
      page.visit();
      page.nameIs(seriesData.name);
      page.descriptionNotExists();
    });

    it('page should fill form with description', () => {
      const seriesData: ISeries = series.arDeko;

      form = new SeriesUpdatePo('0e5930fd-8477-4311-9e00-2eb73bda6fa5');
      form.visit();
      form.isHere();

      form.clearName();
      form.typeName(seriesData.name);

      form.clearDescription();
      form.typeDescription(seriesData.description);

      form.setSyncInterceptor();
      form.clickSubmit();
      form.waitSync();

      // Series check
      const page = new SeriesViewPo('0e5930fd-8477-4311-9e00-2eb73bda6fa5');
      page.visit();
      page.nameIs(seriesData.name);
      page.descriptionIs(seriesData.description);
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
});
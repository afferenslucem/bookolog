/// <reference types="cypress" />

import { LoginPo } from '../../support/pages/auth/login.po';
import * as users from '../../fixtures/users.json';
import { InProgressListPo } from '../../support/pages/books/lists/in-progress-list.po';

context('Login', () => {
  let loginPage: LoginPo = null;
  let inProgressPage: InProgressListPo = null;

  beforeEach(() => {
    inProgressPage = new InProgressListPo();
    loginPage = new LoginPo();
    loginPage.visit();
  });

  it('page should exists', () => {
    loginPage.isHere();
  });

  it('should login', () => {
    const user = users.hrodvitnir;

    loginPage.typeLogin(user.login);
    loginPage.typePassword(user.password);

    loginPage.clickSubmit();
    loginPage.waitLoginSuccess();

    inProgressPage.isHere();
  });
});

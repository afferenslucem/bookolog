/// <reference types="cypress" />

import { LoginPo } from '../../support/pages/login.po';
import * as users from '../../fixtures/users.json';
import { InProgressPo } from '../../support/pages/in-progress.po';

context('Login', () => {
  let loginPage: LoginPo = null;
  let inProgressPage: InProgressPo = null;

  beforeEach(() => {
    inProgressPage = new InProgressPo();
    loginPage = new LoginPo();
    loginPage.visit();
  });

  it('loginPage should exists', () => {
    loginPage.isHere();
  });

  it('should login', () => {
    const user = users.hrodvitnir;

    loginPage.typeLogin(user.login);
    loginPage.typePassword(user.password);

    loginPage.clickSubmit();

    inProgressPage.isHere();
  });
});

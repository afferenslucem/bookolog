/// <reference types="cypress" />

import { LoginPo } from '../../support/pages/auth/login.po';
import * as users from '../../fixtures/users.json';
import { InProgressListPo } from '../../support/pages/books/lists/in-progress-list.po';
import { RegistrationPo } from '../../support/pages/auth/registration.po';
import { loginAs } from '../../support/routines';

context('Registration', () => {
  let registrationPage: RegistrationPo = null;
  let loginPage: LoginPo = null;

  beforeEach(() => {
    registrationPage = new RegistrationPo();
    loginPage = new LoginPo();
    registrationPage.visit();
  });

  it('page should exists', () => {
    registrationPage.isHere();
  });

  it('should register', () => {
    const user = users.regCheck;

    registrationPage.typeLogin(user.login);
    registrationPage.typeEmail(user.email);
    registrationPage.typePassword(user.password);
    registrationPage.typeConfirmation(user.password);

    registrationPage.clickSubmit();

    loginPage.isHere();

    loginAs(user);
  });
});

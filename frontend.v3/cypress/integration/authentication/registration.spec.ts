/// <reference types="cypress" />

import { LoginPo } from '../../support/pages/login.po';
import * as users from '../../fixtures/users.json';
import { InProgressPo } from '../../support/pages/in-progress.po';
import { RegistrationPo } from '../../support/pages/registration.po';

context('Registration', () => {
  let registrationPage: RegistrationPo = null;
  let loginPage: LoginPo = null;

  beforeEach(() => {
    registrationPage = new RegistrationPo();
    loginPage = new LoginPo();
    registrationPage.visit();
  });

  it('RegistrationPage should exists', () => {
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
  });
});

import { LoginPo } from '../support/pages/auth/login.po';
import { InProgressListPo } from '../support/pages/books/lists/in-progress-list.po';
import * as users from '../fixtures/users.json';
import { RegistrationPo } from '../support/pages/auth/registration.po';
import { loginAs, logout } from '../support/routines';
import { PageObject } from '../support/pages/page-object';
import { MainPo } from '../support/pages/main.po';
import { LogoutPo } from '../support/pages/auth/logout.po';

context('Authentication', () => {
  beforeEach(() => {
    new PageObject().setMobileViewport();
  });

  afterEach(() => {
    logout();
  });

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

      inProgressPage.isHere();
    });

    it('should redirect to inProgress for visit main', () => {
      const user = users.hrodvitnir;

      loginPage.typeLogin(user.login);
      loginPage.typePassword(user.password);
      loginPage.clickSubmit();

      inProgressPage.isHere();

      new MainPo().visit();

      inProgressPage.isHere();
    });
  });

  context('Logout', () => {
    let loginPage: LoginPo = null;
    let inProgressPage: InProgressListPo = null;

    beforeEach(() => {
      inProgressPage = new InProgressListPo();
      loginPage = new LoginPo();
      loginPage.visit();
    });

    it('should logout', () => {
      const user = users.hrodvitnir;

      loginPage.typeLogin(user.login);
      loginPage.typePassword(user.password);
      loginPage.clickSubmit();

      inProgressPage.isHere();

      new LogoutPo().visit();

      new PageObject('/main').isHere();
    });
  });

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
});

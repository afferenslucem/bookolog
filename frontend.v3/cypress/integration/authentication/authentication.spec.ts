import { LoginPo } from '../../support/pages/auth/login.po';
import { InProgressListPo } from '../../support/pages/books/lists/in-progress-list.po';
import * as users from '../../fixtures/users.json';
import { RegistrationPo } from '../../support/pages/auth/registration.po';
import { loginAs, logout } from '../../support/routines';

context('Authentication', () => {
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
      loginPage.waitLoginSuccess();

      inProgressPage.isHere();
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
})

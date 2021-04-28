/// <reference types="cypress" />

import * as users from '../fixtures/users.json';
import { loginAs, logout } from '../support/routines';
import { PageObject } from '../support/pages/page-object';
import { SettingsPo } from '../support/pages/statistic/settings/settings.po';
import { PasswordSettingsPo } from '../support/pages/statistic/settings/password-settings.po';
import { EmailSettingsPo } from '../support/pages/statistic/settings/email-settings.po';

context('Settings', () => {
  beforeEach(() => {
    new PageObject().setMobileViewport();
  });

  beforeEach(() => {
    const user = users.settingsChangeCheck;
    loginAs(user);
  });

  afterEach(() => {
    logout();
  });

  context('Settings', () => {
    let settingsPo: SettingsPo = null;

    beforeEach(() => {
      settingsPo = new SettingsPo();
      settingsPo.visit();
    });

    it('page should exists', () => {
      settingsPo.isHere();
    });

    it('should change email', () => {
      const user = users.settingsChangeCheck;

      const po = new EmailSettingsPo();

      const newEmail = 'newEmail@mail.ru';

      po.emailIs(user.email);
      po.clearEmail();
      po.typeEmail(newEmail);

      po.interceptEmailChange();
      po.submit();

      logout();
      loginAs(user);

      settingsPo.visit();
      settingsPo.isHere();

      po.emailIs(newEmail);
    });

    it('should change password', () => {
      const user = users.settingsChangeCheck;

      const po = new PasswordSettingsPo();

      const newPassword = 'newPassword';

      po.typeCurrentPassword(user.password);
      po.typeNewPassword(newPassword);
      po.typeConfirmationPassword(newPassword);

      po.interceptPasswordChange();
      po.submit();
      po.waitServerAnswer();

      logout();
      loginAs({
        login: user.login,
        password: newPassword,
      });
    });
  });
});

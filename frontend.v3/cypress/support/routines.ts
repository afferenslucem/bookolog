import { IUser } from './interfaces/i-user';
import { LoginPo } from './pages/login.po';
import { LogoutPo } from './pages/logout.po';

export function loginAs(user: IUser): void {
  const loginPage = new LoginPo();

  loginPage.visit();

  loginPage.typeLogin(user.login);
  loginPage.typePassword(user.password);

  loginPage.clickSubmit();

  loginPage.waitLoginSuccess();
}

export function logout(): void {
  const logoutPage = new LogoutPo();

  logoutPage.visit();
}

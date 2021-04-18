import { IUser } from './interfaces/i-user';
import { LoginPo } from './pages/auth/login.po';
import { LogoutPo } from './pages/auth/logout.po';
import { IBook } from './interfaces/i-book';
import { DoneBookCreatePo } from './pages/books/forms/done-book-create.po';
import { InProgressListPo } from './pages/books/lists/in-progress-list.po';

export function loginAs(user: IUser): void {
  const loginPage = new LoginPo();


  loginPage.visit();

  loginPage.typeLogin(user.login);
  loginPage.typePassword(user.password);

  loginPage.clickSubmit();

  loginPage.waitLoginSuccess();

  new InProgressListPo().isHere();
}

export function logout(): void {
  const logoutPage = new LogoutPo();

  logoutPage.visit();
}

export function createDoneBook(book: IBook): void {
  const formPage = new DoneBookCreatePo();

  formPage.visit();
  formPage.isHere();

  formPage.typeName(book.name);
  book.authors.forEach(item => formPage.typeAuthor(item));
  formPage.typeYear(book.year);
  formPage.typeGenre(book.genre);
  book.tags.forEach(item => formPage.typeTag(item));
  formPage.selectType(book.type);
  formPage.typeStartedDate(book.startYear, book.startMonth, book.startDay);
  formPage.typeFinishedDate(book.finishYear, book.finishMonth, book.finishDay);
  formPage.typeNotes(book.notes);
  formPage.clickSubmit();
  formPage.waitSync();
}

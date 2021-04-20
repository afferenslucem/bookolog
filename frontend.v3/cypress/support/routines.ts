import { IUser } from './interfaces/i-user';
import { LoginPo } from './pages/auth/login.po';
import { LogoutPo } from './pages/auth/logout.po';
import { IBook } from './interfaces/i-book';
import { DoneBookCreatePo } from './pages/books/forms/done-book-create.po';
import { InProgressListPo } from './pages/books/lists/in-progress-list.po';
import { ISeries } from './interfaces/i-series';
import { SeriesCreatePo } from './pages/series/series-create.po';
import { ToReadBookCreatePo } from './pages/books/forms/to-read-book-create.po';
import { SeriesListPo } from './pages/series/series-list.po';

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

  if (book.series) {
    formPage.selectType(book.type);
  }

  book.tags.forEach(item => formPage.typeTag(item));
  formPage.selectType(book.type);
  formPage.typeStartedDate(book.startYear, book.startMonth, book.startDay);
  formPage.typeFinishedDate(book.finishYear, book.finishMonth, book.finishDay);
  formPage.typeNotes(book.notes);

  formPage.setSyncInterceptor();
  formPage.clickSubmit();
  formPage.waitSync();
}

export function createToReadBook(book: IBook): void {
  let formPage: ToReadBookCreatePo = new ToReadBookCreatePo();

  formPage.visit();
  formPage.isHere();

  formPage.typeName(book.name);
  book.authors.forEach(item => formPage.typeAuthor(item));
  formPage.typeYear(book.year);
  formPage.typeGenre(book.genre);

  if (book.series) {
    formPage.selectSeries(book.series);
  }

  book.tags.forEach(item => formPage.typeTag(item));
  formPage.selectType(book.type);

  if (book.notes) {
    formPage.typeNotes(book.notes);
  }

  formPage.setSyncInterceptor();
  formPage.clickSubmit();
  formPage.waitSync();
}

export function createSeries(series: ISeries): void {
  let form: SeriesCreatePo = new SeriesCreatePo();
  form.visit();
  form.typeName(series.name);
  form.typeDescription(series.description);

  form.setSyncInterceptor();
  form.clickSubmit();
  form.waitSync();
}

export function seriesContainsBooksCount(seriesName: string, count: number): void {
  new SeriesListPo().visit();
  new SeriesListPo().isHere();
  new SeriesListPo().seriesContainsBooksCount(seriesName, count);
}

export function seriesDoesNotExists(seriesName: string): void {
  new SeriesListPo().visit();
  new SeriesListPo().isHere();
  new SeriesListPo().seriesNotContains(seriesName);
}

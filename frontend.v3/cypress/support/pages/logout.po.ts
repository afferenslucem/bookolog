import { PageObject } from './page-object';
import Chainable = Cypress.Chainable;

export class LogoutPo extends PageObject {
  public constructor() {
    super('/logout');
  }
}

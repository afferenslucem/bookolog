import { PageObject } from '../page-object';

export class LogoutPo extends PageObject {
  public constructor() {
    super('/logout');
  }
}

import { baseUrl } from '../constants';
import { PageObject } from './page-object';

export class SearchablePageObject extends PageObject {
  protected url: string;

  public constructor();
  public constructor(url: string);
  public constructor(url?: string) {
    super(url);
  }

  public search(pattern: string): void {
    cy.get('app-search mat-icon').click();
    cy.get('app-search input').type(pattern);
  }
}

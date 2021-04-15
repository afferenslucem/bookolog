import { BookListPo } from './book-list.po';

export class InProgressListPo extends BookListPo {
  public constructor() {
    super('/in-progress');
  }
}

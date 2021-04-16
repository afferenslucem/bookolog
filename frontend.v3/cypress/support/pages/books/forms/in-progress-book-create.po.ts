import { BookCreatePo } from './book-create.po';

export class InProgressBookCreatePo extends BookCreatePo {
  public constructor() {
    super('/book/create/1');
  }
}

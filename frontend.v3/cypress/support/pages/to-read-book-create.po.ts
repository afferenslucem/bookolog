import { BookCreatePo } from './book-create.po';

export class ToReadBookCreatePo extends BookCreatePo {
  public constructor() {
    super('/book/create/0');
  }
}

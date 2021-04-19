import { BookCreatePo } from './book-create.po';

export class DoneBookCreatePo extends BookCreatePo {
  public constructor() {
    super('/book/create/2');
  }
}

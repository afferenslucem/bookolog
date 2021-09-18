import { BookCreatePo } from './book-create.po';

export class BookEditPo extends BookCreatePo {
  public constructor(guid: string) {
    super(`/book/edit/${ guid }`);
  }
}

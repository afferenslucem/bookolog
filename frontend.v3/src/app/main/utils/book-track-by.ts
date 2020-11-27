import { Book } from '../../modules/book/models/book';

export class BookTrackBy {
  public static trackBy(index: number, item: Book): string {
    return item.guid;
  }
}

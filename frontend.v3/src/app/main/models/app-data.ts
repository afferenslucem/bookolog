import { BookData } from '../../modules/book/models/book-data';
import { CollectionData } from '../../modules/collection/models/collection-data';

export interface AppData {
  books: BookData[];
  collections: CollectionData[];
}

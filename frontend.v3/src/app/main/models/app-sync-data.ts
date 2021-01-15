import { BookData } from '../../modules/book/models/book-data';
import { CollectionData } from '../../modules/collection/models/collection-data';
import { SyncData } from './sync-data';

export interface AppSyncData {
  books: SyncData<BookData>;
  collections: SyncData<CollectionData>;
}

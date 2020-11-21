import { Injectable } from '@angular/core';
import _ from 'declarray';
import { getLogger } from '../../../main/app.logging';
import { SyncService } from '../../../main/services/sync.service';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';
import { BookStorageService } from './book.storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private logger = getLogger('BookService');

  constructor(private syncService: SyncService, private storage: BookStorageService, private origin: BookOriginService) {
  }

  public async getAll(): Promise<Book[]> {
    const data = await this.storage.getAll();

    return _(data).select(item => new Book(item)).toArray();
  }

  public async getByGuid(guid: string): Promise<Book> {
    const data = await this.storage.getByGuid(guid);

    return new Book(data);
  }

  public async getByStatus(status: BookStatus): Promise<Book[]> {
    const data = await this.storage.getAllByStatus(status);

    return _(data)
      .where(item => !item.deleted)
      .select(item => new Book(item))
      .toArray();
  }

  public async deleteBook(book: Book): Promise<void> {
    try {
      this.logger.debug('bookDelete');

      await this.origin.delete(book.guid);
      await this.storage.delete(book.guid);
    } catch (e) {
      await this.softDelete(book);
    }
  }

  private async softDelete(book: Book): Promise<void> {
    book.deleted = true;

    const dto = book.convertToDTO();

    await this.storage.update(dto);
  }

  public async restore(): Promise<void> {
    const data = await this.origin.getAll();
    await this.storage.restore(data);
  }

  public async sync(): Promise<void> {
    const allBooks = await this.storage.getAll();

    const deletedToSync = _(allBooks).where(item => item.deleted).toArray();
    const updatedToSync = _(allBooks).where(item => item.shouldSync).toArray();

    const remoteSyncData = await this.origin.sync({
      localDeleted: deletedToSync,
      localUpdated: updatedToSync
    });

    const toDelete = _(remoteSyncData.delete)
      .concat(deletedToSync)
      .toArray();

    const toUpdate = _(updatedToSync)
      .select(item => {
        item.shouldSync = false;
        return item;
      })
      .concat(remoteSyncData.update)
      .toArray();

    const deleting = this.storage.deleteMany(toDelete);
    const updating = this.storage.updateMany(toUpdate);

    await Promise.all([updating, deleting]);
  }
 }

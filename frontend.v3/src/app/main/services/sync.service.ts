import { Injectable } from '@angular/core';
import addSeconds from 'date-fns/addSeconds';
import { environment } from '../../../environments/environment';
import { BookService } from '../../modules/book/services/book.service';
import { CollectionService } from '../../modules/collection/services/collection.service';
import { NotificationService } from '../../modules/notification/services/notification.service';
import { UserService } from '../../modules/user/services/user.service';
import { AppSyncData } from '../models/app-sync-data';
import { DateUtils } from '../utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
  ) {}

  public get lastSyncDate(): Date {
    return this.userService.lastSyncDate;
  }

  public get shouldRestore(): boolean {
    const nextSync = !this.userService.lastSyncDate || addSeconds(this.userService.lastSyncDate, environment.restoreTimeSeconds);

    return nextSync <= this.nowUTC;
  }

  public get nowUTC(): Date {
    return DateUtils.nowUTC;
  }

  public get now(): Date {
    return DateUtils.now;
  }

  public async syncUser(): Promise<void> {
    await this.userService.loadMe();
  }

  public async sync(): Promise<void> {
    try {
      if (this.shouldRestore) {
        await this.restoreAll();
      } else {
        await this.syncAll();
      }
    } catch (e) {
      this.notificationService.createErrorNotification('Синхронизация неудалась');
    }
  }

  public async restoreAll(): Promise<void> {
    await this.syncAll();

    const data = await this.userService.restore();

    const books = this.bookService.restore(data.books);
    const collections = this.collectionService.restore(data.collections);

    await Promise.all([books, collections]);
  }

  public async syncAll(): Promise<void> {
    try {
      const syncData = await this.getSyncData();

      const data = await this.userService.synchronize(syncData);

      const booksSync = this.bookService.sync(syncData.books, data.books);
      const collectionsSync = this.collectionService.sync(syncData.collections, data.collections);
      const userSync = await this.syncUser();

      await Promise.all([booksSync, collectionsSync, userSync]);
    } catch (e) {
      this.notificationService.createErrorNotification('Синхронизация неудалась');
    }
  }

  public async getSyncData(): Promise<AppSyncData> {
    const booksToSync = this.bookService.getToSync();
    const collectionsToSync = this.collectionService.getToSync();

    const data = await Promise.all([booksToSync, collectionsToSync]);

    return {
      books: data[0],
      collections: data[1],
    };
  }
}

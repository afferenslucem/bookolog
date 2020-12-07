import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BookService } from '../../modules/book/services/book.service';
import { NotificationService } from '../../modules/notification/services/notification.service';
import { DateUtils } from '../utils/date-utils';
import { UserService } from '../../modules/user/services/user.service';
import addSeconds from 'date-fns/addSeconds';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private readonly logger = getLogger('SyncService');

  constructor(private userService: UserService, private bookService: BookService, private notificationService: NotificationService) { }

  public async syncAll(): Promise<void> {
    await this.bookSync();

    await this.userSync();
  }

  public async userSync(): Promise<void> {
    await this.userService.loadMe();
  }

  public async bookSync(): Promise<void> {
    try {
      if (this.shouldRestore) {
        this.logger.debug('restore');
        await this.bookService.restore();
      } else {
        this.logger.debug('sync');
        await this.bookService.sync();
      }

    } catch (e) {
      this.notificationService.createErrorNotification('Синхронизация неудалась');
    }
  }

  public get lastSyncDate(): Date {
    return this.userService.lastSyncDate;
  }

  public get shouldRestore(): boolean {
    const nextSync = addSeconds(this.userService.lastSyncDate, environment.restoreTimeSeconds);

    return nextSync <= this.nowUTC;
  }

  public get nowUTC(): Date {
    return DateUtils.nowUTC;
  }

  public get now(): Date {
    return DateUtils.now;
  }
}

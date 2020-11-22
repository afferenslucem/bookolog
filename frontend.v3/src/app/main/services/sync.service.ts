import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DateUtils } from '../utils/date-utils';
import { UserService } from './user.service';
import addSeconds from 'date-fns/addSeconds';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private readonly logger = getLogger('SyncService');

  constructor(private userService: UserService) { }

  public async getData<T>(getLocal: () => Promise<T>, getRemote: () => Promise<T>, updateLocal: (data: T) => Promise<void>): Promise<T> {
    if (this.shouldRestore) {
      const remote = await getRemote();
      await updateLocal(remote);
      this.logger.debug('Return remote');
    } else {
      this.logger.debug('Return local');
    }

    return await getLocal();
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

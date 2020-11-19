import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import addSeconds from 'date-fns/addSeconds';
import addMinutes from 'date-fns/addMinutes';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private readonly logger = getLogger('SyncService');

  constructor(private userService: UserService) { }

  public async getData<T>(getLocal: () => Promise<T>, getRemote: () => Promise<T>, updateLocal: (data: T) => Promise<void>): Promise<T> {
    if (this.shouldSync) {
      const remote = await getRemote();
      await updateLocal(remote);
      this.logger.debug('Return remote');
    } else {
      this.logger.debug('Return local');
    }

    return await getLocal();
  }

  public get shouldSync(): boolean {
    const nextSync = addSeconds(this.userService.lastSyncDate, environment.synchTimeSeconds);

    return nextSync <= this.nowUTC;
  }

  public get nowUTC(): Date {
    const now = this.now;

    return addMinutes(now, now.getTimezoneOffset());
  }

  public get now(): Date {
    return new Date();
  }
}

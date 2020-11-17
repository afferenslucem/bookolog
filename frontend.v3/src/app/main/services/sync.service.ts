import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../modules/user/services/user.service';
import addSeconds from 'date-fns/addSeconds';
import addMinutes from 'date-fns/addMinutes';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  constructor(private userService: UserService) { }

  public async getData<T>(getLocal: () => Promise<T>, getRemote: () => Promise<T>, updateLocal: (data: T) => Promise<void>): Promise<T> {
    if (this.shouldSync) {
      const remote = await getRemote();
      await updateLocal(remote);
    }

    return await getLocal();
  }

  public get shouldSync(): boolean {
    const nextSync = addSeconds(this.userService.lastSyncDate, environment.synchTimeSeconds);

    return nextSync <= this.currentUTC || true;
  }

  public get currentUTC(): Date {
    const now = new Date();

    return addMinutes(now, now.getTimezoneOffset());
  }
}

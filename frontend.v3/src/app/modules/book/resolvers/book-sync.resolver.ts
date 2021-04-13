import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { SyncService } from '../../../main/services/sync.service';

@Injectable({ providedIn: 'root' })
export class BookSyncResolver implements Resolve<boolean> {
  private logger = getConsoleLogger({
    loggerName: 'BookSyncResolver',
    namespace: 'Resolver',
  });

  public constructor(private sync: SyncService) {}

  public async resolve(): Promise<boolean> {
    try {
      await this.sync.sync();

      return true;
    } catch (e) {
      return false;
    }
  }
}

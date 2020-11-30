import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { SyncService } from '../../../main/services/sync.service';

@Injectable({providedIn: 'root'})
export class BookSyncResolver implements Resolve<boolean> {
  private logger = getLogger({
    loggerName: 'BookSyncResolver',
    namespace: 'Resolver',
  });

  public constructor(private sync: SyncService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.sync.bookSync();

      return true;
    } catch (e) {
      return false;
    }
  }
}

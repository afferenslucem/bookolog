import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { SyncService } from '../../../main/services/sync.service';
import { BookService } from '../services/book.service';

@Injectable({providedIn: 'root'})
export class BookSyncResolver {
  private logger = getLogger({
    loggerName: 'BookSyncResolver',
    namespace: 'Resolver',
  });

  public constructor(private bookService: BookService, private sync: SyncService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      if (this.sync.shouldRestore) {
        this.logger.debug('restore');
        await this.bookService.restore();
      } else {
        this.logger.debug('sync');
        await this.bookService.sync();
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}

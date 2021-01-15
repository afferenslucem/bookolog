import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Injectable({providedIn: 'root'})
export class AllSeriesResolver implements Resolve<Collection[]> {
  private logger = getLogger({
    loggerName: 'ToReadBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private collectionService: CollectionService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Collection[]> {
    const result = await this.collectionService.getAll();

    this.logger.debug('Series result: ', result);

    return result;
  }
}

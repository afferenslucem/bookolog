import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Injectable({providedIn: 'root'})
export class CollectionResolver implements Resolve<Collection> {
  private logger = getLogger({
    loggerName: 'CollectionResolver',
    namespace: 'Resolver',
  });

  public constructor(private collectionService: CollectionService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Collection> {
    const guid = route.paramMap.get('guid');

    const collection = await this.collectionService.getByGuid(guid);

    this.logger.debug('Collection result: ', collection);

    return collection;
  }
}

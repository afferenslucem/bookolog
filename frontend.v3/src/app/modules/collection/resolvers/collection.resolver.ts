import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Injectable({ providedIn: 'root' })
export class CollectionResolver implements Resolve<Collection> {
  private logger = getConsoleLogger({
    loggerName: 'CollectionResolver',
    namespace: 'Resolver',
  });

  public constructor(private collectionService: CollectionService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Collection> {
    const guid = route.paramMap.get('guid');

    const collection = await this.collectionService.getByGuid(guid);

    this.logger.debug('Collection result: ', collection);

    return collection;
  }
}

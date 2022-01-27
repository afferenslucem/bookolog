import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Injectable({ providedIn: 'root' })
export class CollectionResolver implements Resolve<Collection> {
  public constructor(private collectionService: CollectionService) {}

  public async resolve(route: ActivatedRouteSnapshot): Promise<Collection> {
    const guid = route.paramMap.get('guid');

    const collection = await this.collectionService.getByGuid(guid);

    return collection;
  }
}

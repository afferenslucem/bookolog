import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';
import _ from 'declarray';

@Injectable({providedIn: 'root'})
export class AllSeriesResolver implements Resolve<Collection[]> {
  private logger = getConsoleLogger({
    loggerName: 'ToReadBooksResolver',
    namespace: 'Resolver',
  });

  public constructor(private collectionService: CollectionService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Collection[]> {
    const result = await this.collectionService.getAll();

    this.logger.debug('Series result: ', result);

    return _(result)
      .orderByDescending(item => item.modifyDate || -1)
      .thenByDescending(item => item.createDate || -1)
      .toArray();
  }
}

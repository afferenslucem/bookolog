import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';
import _ from 'declarray';

@Injectable({ providedIn: 'root' })
export class AllSeriesResolver implements Resolve<Collection[]> {
  public constructor(private collectionService: CollectionService) {}

  public async resolve(): Promise<Collection[]> {
    const result = await this.collectionService.getAll();

    return _(result)
      .orderByDescending(item => item.modifyDate || -1)
      .thenByDescending(item => item.createDate || -1)
      .toArray();
  }
}

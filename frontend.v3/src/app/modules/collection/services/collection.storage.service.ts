import { Injectable } from '@angular/core';
import { EntityStorage } from '../../../main/services/entity.storage';
import { IndexedDbService } from '../../../main/services/indexed-db.service';
import { PreloaderService } from '../../../main/services/preloader.service';
import { CollectionData } from '../models/collection-data';

@Injectable({
  providedIn: 'root'
})
export class CollectionStorageService extends EntityStorage<CollectionData>{

  constructor(indexedDb: IndexedDbService, private preloaderService: PreloaderService) {
    super('CollectionsStore', indexedDb);
  }
}

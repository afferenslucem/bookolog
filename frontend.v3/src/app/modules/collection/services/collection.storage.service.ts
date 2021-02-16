import { Injectable } from '@angular/core';
import { EntityStorage } from '../../../main/services/entity.storage';
import { IndexedDbService } from '../../../main/services/indexed-db.service';
import { PreloaderService } from '../../../main/services/preloader.service';
import { CollectionData } from '../models/collection-data';
import { UserService } from '../../user/services/user.service';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionStorageService extends EntityStorage<CollectionData> {
  constructor(indexedDb: IndexedDbService, private preloaderService: PreloaderService, uuidGenerator: UUIDGeneratorService) {
    super('CollectionsStore', indexedDb, uuidGenerator);
  }
}

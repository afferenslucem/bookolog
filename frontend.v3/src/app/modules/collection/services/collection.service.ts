import { Injectable } from '@angular/core';
import { EntityService } from '../../../main/services/entity.service';
import { NotificationService } from '../../notification/services/notification.service';
import { Collection } from '../models/collection';
import { CollectionData } from '../models/collection-data';
import { CollectionOriginService } from './collection.origin.service';
import { CollectionStorageService } from './collection.storage.service';
import { Book } from '../../book/models/book';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends EntityService<CollectionData, Collection>{
  private typedStorage: CollectionStorageService;

  constructor(storage: CollectionStorageService,
              origin: CollectionOriginService,
              private notificationService: NotificationService,
  ) {
    super(storage, origin);

    this.typedStorage = storage;
  }

  public async delete(collection: Collection): Promise<void> {
    try {
      await super.delete(collection);
    } catch (e) {
      this.notificationService.createWarningNotification('Серия удалена локально');
    }
  }

  public async saveOrUpdate(collection: Collection): Promise<Collection> {
    try {
      collection = await super.saveOrUpdate(collection);
    } catch (e) {
      this.notificationService.createWarningNotification('Серия сохранена локально');
    }

    return collection;
  }


  public convertFromDTO(dto: CollectionData): Collection {
    return new Collection(dto);
  }

  public convertToDTO(entity: Collection): CollectionData {
    const result: CollectionData = {
      guid: entity.guid,
      name: entity.name,
      description: entity.description,
      deleted: entity.deleted || 0,
      shouldSync: entity.shouldSync || 0,
      createDate: this.formatDate(entity.createDate),
      modifyDate: this.formatDate(entity.modifyDate),
    };

    return result;
  }
}

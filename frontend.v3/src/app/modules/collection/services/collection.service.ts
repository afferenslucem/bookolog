import { Injectable } from '@angular/core';
import { EntityService } from '../../../main/services/entity.service';
import { Collection } from '../models/collection';
import { CollectionData } from '../models/collection-data';
import { CollectionOriginService } from './collection.origin.service';
import { CollectionStorageService } from './collection.storage.service';
import { EntityValidationError } from '../../../main/models/errors/entity-validation-error';
import { CollectionValidationChain } from '../utils/validation/collection-validation-chain';

@Injectable({
  providedIn: 'root',
})
export class CollectionService extends EntityService<CollectionData, Collection> {
  private validateEntityChain = new CollectionValidationChain();
  private typedStorage: CollectionStorageService;

  constructor(storage: CollectionStorageService, origin: CollectionOriginService) {
    super(storage, origin);

    this.typedStorage = storage;
  }

  public async saveOrUpdate(collection: Collection): Promise<Collection> {
    this.validate(collection);

    collection = await super.saveOrUpdate(collection);
    return collection;
  }

  public async updateModifyTime(guid: string): Promise<void> {
    const collection = await this.getByGuid(guid);

    await this.saveOrUpdate(collection);
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

  private validate(collection: Collection): void {
    const errors = this.validateEntityChain.validate(collection);

    if (errors) {
      throw new EntityValidationError(errors);
    }
  }
}

import { IEntity } from '../models/i-entity';
import { IStorage } from './i-storage';
import { IndexedDbService } from './indexed-db.service';
import { UUIDGeneratorService } from './u-u-i-d-generator.service';

export abstract class EntityStorage<T extends IEntity> implements IStorage<T> {
  protected readonly dbName = 'bookolog.db';
  protected readonly storeName: string;

  public constructor(storeName: string, protected indexedDb: IndexedDbService, private uuidGenerator: UUIDGeneratorService) {
    this.storeName = storeName;
  }

  public async getAll(): Promise<T[]> {
    try {
      await this.indexedDb.open(this.dbName);
      const data: any = await this.indexedDb.all(this.storeName);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async count(): Promise<number> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.getCount(this.storeName, 'guid');

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getDeleted(): Promise<T[]> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.allWithProperty(this.storeName, 'deleted', 1);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getShouldSync(): Promise<T[]> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.allWithProperty(this.storeName, 'shouldSync', 1);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async getByGuid(guid: string): Promise<T> {
    try {
      await this.indexedDb.open(this.dbName);

      const data: any = await this.indexedDb.get(this.storeName, 'guid', guid);

      return data.target.result;
    } finally {
      this.indexedDb.close();
    }
  }

  public async saveMany(entities: T[]): Promise<T[]> {
    if (entities.length === 0) {
      return [];
    }

    try {
      await this.indexedDb.open(this.dbName);

      entities.forEach(item => {
        if (!item.guid) {
          item.guid = this.uuidGenerator.generate();
        }
      });

      await this.indexedDb.saveMany(this.storeName, entities);

      return entities;
    } finally {
      this.indexedDb.close();
    }
  }

  public async save(entity: T): Promise<T> {
    try {
      await this.indexedDb.open(this.dbName);

      if (!entity.guid) {
        entity.guid = this.uuidGenerator.generate();
      }

      await this.indexedDb.save(this.storeName, entity);

      return entity;
    } finally {
      this.indexedDb.close();
    }
  }

  public async updateMany(entities: T[]): Promise<T[]> {
    if (entities.length === 0) {
      return [];
    }

    try {
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.updateMany(this.storeName, entities);

      return entities;
    } finally {
      this.indexedDb.close();
    }
  }

  public async update(entity: T): Promise<T> {
    try {
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.update(this.storeName, entity);

      return entity;
    } finally {
      this.indexedDb.close();
    }
  }

  public async deleteMany(guids: string[]): Promise<void> {
    if (guids.length === 0) {
      return;
    }

    try {
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.deleteMany(this.storeName, guids);

      return;
    } finally {
      this.indexedDb.close();
    }
  }

  public async delete(guid: string): Promise<void> {
    try {
      await this.indexedDb.open(this.dbName);

      await this.indexedDb.delete(this.storeName, guid);
    } finally {
      this.indexedDb.close();
    }
  }

  public async restore(entities: T[]): Promise<void> {
    await this.clear();
    await this.saveMany(entities);
  }

  public async clear(): Promise<void> {
    try {
      await this.indexedDb.open(this.dbName);
      await this.indexedDb.clear(this.storeName);
    } finally {
      this.indexedDb.close();
    }
  }
}

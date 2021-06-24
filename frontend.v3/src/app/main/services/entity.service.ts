import format from 'date-fns/format';
import _ from 'declarray';
import { Entity } from '../models/entity';
import { IEntity } from '../models/i-entity';
import { SyncData } from '../models/sync-data';
import { EntityStorage } from './entity.storage';
import { ISyncableOrigin } from './i-syncable-origin';
import { DateUtils } from '../utils/date-utils';
import { BookValidationChain } from '../../modules/book/utils/validation/book-validation-chain';

export abstract class EntityService<TDTO extends IEntity, TEntity extends Entity> {
  public constructor(protected storage: EntityStorage<TDTO>, protected origin: ISyncableOrigin<TDTO>) {}

  public async getAll(): Promise<TEntity[]> {
    const data = await this.storage.getAll();

    return _(data)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public async getByGuid(guid: string): Promise<TEntity> {
    const data = await this.storage.getByGuid(guid);

    return this.convertFromDTO(data);
  }

  public async getAllCount(): Promise<number> {
    const data = await this.storage.count();

    return data;
  }

  public async loadAll(): Promise<void> {
    const data = await this.origin.getAll();
    await this.storage.restore(data);
  }

  public async delete(entity: TEntity): Promise<void> {
    try {
      await this.origin.delete(entity.guid);
      await this.storage.delete(entity.guid);
      await this.entitiesSync();
    } catch (e) {
      await this.softDelete(entity);
      throw e;
    }
  }

  public async restore(entities: TDTO[]): Promise<void> {
    await this.storage.clear();
    await this.storage.saveMany(entities);
  }

  public async saveOrUpdate(entity: TEntity): Promise<TEntity> {
    entity.shouldSync = 1;
    const dto = this.convertToDTO(entity);

    dto.modifyDate = this.getNowUTC();
    if (entity.guid) {
      await this.storage.update(dto);
    } else {
      dto.createDate = this.getNowUTC();
      await this.storage.save(dto);
    }

    await this.entitiesSync();

    return this.convertFromDTO(dto);
  }

  public async saveOrUpdateMany(entities: TEntity[]): Promise<TEntity[]> {
    entities.forEach(item => (item.shouldSync = 1));

    const dtos = this.convertToDTOArray(entities);

    const toSave = _(dtos)
      .where(item => !item.guid)
      .toArray();
    const toUpdate = _(dtos)
      .where(item => !!item.guid)
      .toArray();

    const updateAwait = this.storage.updateMany(toUpdate);
    const saveAwait = this.storage.saveMany(toSave);

    await Promise.all([updateAwait, saveAwait]);

    await this.entitiesSync();

    return this.convertFromDTOArray(dtos);
  }

  public async softDelete(entity: TEntity): Promise<void> {
    entity.deleted = 1;

    const dto = this.convertToDTO(entity);

    await this.storage.update(dto);
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

  public convertToDTOArray(entities: TEntity[]): TDTO[] {
    return _(entities)
      .select(item => this.convertToDTO(item))
      .toArray();
  }

  public abstract convertToDTO(entity: TEntity): TDTO;

  public convertFromDTOArray(entities: TDTO[]): TEntity[] {
    return _(entities)
      .select(item => this.convertFromDTO(item))
      .toArray();
  }

  public abstract convertFromDTO(dto: TDTO): TEntity;

  public async entitiesSync(): Promise<void> {
    const local = await this.getToSync();

    const remote = await this.origin.sync(local);

    await this.sync(local, remote);
  }

  public async getToSync(): Promise<SyncData<TDTO>> {
    const deleted = this.storage.getDeleted();
    const updated = this.storage.getShouldSync();

    const diff = await Promise.all([deleted, updated]);

    return {
      delete: diff[0].map(item => item.guid),
      update: diff[1],
    };
  }

  public async sync(local: SyncData<TDTO>, remote: SyncData<TDTO>): Promise<void> {
    const toDelete: string[] = _(remote.delete).concat(local.delete).toArray();

    const toUpdate: TDTO[] = _(local.update)
      .select(item => {
        item.shouldSync = 0;
        return item;
      })
      .concat(remote.update)
      .toArray();

    const deleting = this.storage.deleteMany(toDelete);
    const updating = this.storage.updateMany(toUpdate);

    await Promise.all([updating, deleting]);
  }

  public getNowUTC(): Date {
    return DateUtils.nowUTC;
  }

  protected formatDate(date: Date | string): string {
    const temp = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

    return `${temp.slice(0, 10)}T${temp.slice(11, 19)}`;
  }
}

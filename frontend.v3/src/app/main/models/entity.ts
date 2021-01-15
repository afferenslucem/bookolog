import { IEntity } from './i-entity';

export class Entity implements IEntity {
  public guid: string;

  public modifyDate: Date;
  public createDate: Date;

  public deleted?: number;
  public shouldSync?: number;

  public constructor(data: IEntity) {
    this.guid = data.guid;

    this.modifyDate = data.modifyDate ? new Date(data.modifyDate) : null;
    this.createDate = data.createDate ? new Date(data.createDate) : null;

    this.deleted = data.deleted || 0;
    this.shouldSync = data.shouldSync || 0;
  }
}

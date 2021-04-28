import { Collection } from './collection';

export class CollectionInfo {
  name: string;
  guid: string;
  shouldSync: number;
  count: number;
  modifyDate: Date;
  createDate: Date;

  constructor(collection: Collection, count: number) {
    this.name = collection.name;
    this.guid = collection.guid;
    this.shouldSync = collection.shouldSync;
    this.count = count;
    this.modifyDate = collection.modifyDate;
    this.createDate = collection.createDate;
  }

  public toString(): string {
    return this.name;
  }
}

import { IDeletable } from './i-deletable';
import { IUpdatable } from './i-updatable';

export interface IEntity extends IDeletable, IUpdatable {
  guid: string;
  modifyDate: string | Date;
  createDate: string | Date;
}

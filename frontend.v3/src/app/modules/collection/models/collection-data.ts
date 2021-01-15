import { IDeletable } from '../../../main/models/i-deletable';
import { IEntity } from '../../../main/models/i-entity';
import { IUpdatable } from '../../../main/models/i-updatable';

export interface CollectionData extends IDeletable, IUpdatable, IEntity {
  name: string;
  description: string;
}

import { Entity } from '../../../main/models/entity';
import { CollectionData } from './collection-data';

export class Collection extends Entity {
  name: string;
  description: string;

  public constructor(data: CollectionData) {
    super(data);

    this.name = data.name;
    this.description = data.description;
  }
}

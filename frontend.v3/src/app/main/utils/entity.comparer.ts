import { IEntity } from '../models/i-entity';
import { IEqualityComparator } from 'declarray';
import { DefaultComparator } from 'declarray/dist/utils/default-comparator';

export class EntityComparator implements IEqualityComparator<IEntity> {
  public getHashCode(object: IEntity): number {
    return new DefaultComparator().getHashCode(object.guid.toLowerCase());
  }

  public compare(first: IEntity, second: IEntity): number {
    return new DefaultComparator().compare(first.guid, second.guid);
  }

  public equals(first: IEntity, second: IEntity): boolean {
    return first.guid.toLowerCase() === second.guid.toLowerCase();
  }
}

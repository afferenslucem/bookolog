import { IEqualityComparer } from 'declarray';
import { IEntity } from '../models/i-entity';

export class EntityComparer implements IEqualityComparer<IEntity>{
  public equal(first: IEntity, second: IEntity): boolean {
    return first.guid.toLowerCase() === second.guid.toLowerCase();
  }

  public getHashCode(object: IEntity): string | number {
    return object.guid.toLowerCase();
  }
}

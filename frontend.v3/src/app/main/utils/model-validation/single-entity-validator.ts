import { EntityValidationResult } from './entity-validation-result';
import { Entity } from '../../models/entity';

export abstract class SingleEntityValidator<T extends Entity> {
  public abstract validate(entity: T): EntityValidationResult | null;
}

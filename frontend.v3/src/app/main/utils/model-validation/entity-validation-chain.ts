import { EntityValidationErrors } from './entity-validation-errors';
import { SingleEntityValidator } from './single-entity-validator';
import _ from 'declarray';
import { Entity } from '../../models/entity';

export class EntityValidationChain<T extends Entity> {
  private chain: SingleEntityValidator<T>[];

  protected constructor(chain: SingleEntityValidator<T>[]) {
    this.chain = chain;
  }

  public validate(entity: T): EntityValidationErrors | null {
    const result: EntityValidationErrors = {};

    const errors = _(this.chain)
      .select(item => item.validate(entity))
      .where(validateResult => validateResult != null);

    if (errors.count() === 0) {
      return null;
    } else {
      return errors.aggregate((acc, error) => {
        acc[error.error] = error.args;

        return acc;
      }, result);
    }
  }
}

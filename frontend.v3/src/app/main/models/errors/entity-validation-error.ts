import { EntityValidationErrors } from '../../utils/model-validation/entity-validation-errors';

export class EntityValidationError extends Error {
  errors: EntityValidationErrors;

  public constructor(errors: EntityValidationErrors) {
    super();

    this.errors = errors;
  }
}

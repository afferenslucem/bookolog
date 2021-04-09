import { ValidationErrors } from '@angular/forms';

export class AbstractValidator {
  public isEmptyObject(errors: ValidationErrors | null): boolean {
    return !errors || Object.keys(errors).length === 0;
  }

  public assignErrors(target: ValidationErrors, source: ValidationErrors): ValidationErrors {
    return Object.assign(target || {}, source || {});
  }

  public clearErrors(target: ValidationErrors, source: ValidationErrors): ValidationErrors {
    if (!target || !source) {
      return target;
    }

    Object.keys(source).forEach(item => {
      if (item in target) {
        delete target[item];
      }
    });

    if (this.isEmptyObject(target)) {
      return null;
    } else {
      return target;
    }
  }
}

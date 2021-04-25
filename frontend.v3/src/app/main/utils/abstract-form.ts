import { FormGroup, ValidationErrors } from '@angular/forms';

export abstract class AbstractForm<T> {
  protected form: FormGroup = null;

  protected constructor(form: FormGroup) {
    this.form = form;
  }

  public get value(): T {
    return this.form.value;
  }

  public get invalid(): boolean {
    return this.form.invalid;
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public get errors(): ValidationErrors {
    return this.form.errors;
  }

  public get nativeForm(): FormGroup {
    return this.form;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FieldStateService<T = any> {
  public value: T;
  public invalidControl: boolean;
  public hasErrors: boolean;

  constructor() {}

  public get invalid(): boolean {
    return this.invalidControl || this.hasErrors;
  }
}

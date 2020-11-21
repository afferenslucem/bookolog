export interface ValueAccessor {
  writeValue(obj: any): void;

  registerOnChange(fn: any): void;

  registerOnTouched(fn: any): void;

  setDisabledState(isDisabled: boolean): void;
}

export type ChangeDelegate<T> = (value: T) => void;
export type TouchDelegate = (value: TouchEvent | MouseEvent) => void;

export class ValueAccessorBase<T> implements ValueAccessor {
  protected value: T = null;

  private changeListeners: ChangeDelegate<T>[] = [];
  private touchListeners: TouchDelegate[] = [];

  private disabled = false;

  public registerOnChange(fn: ChangeDelegate<T>): void {
    this.changeListeners.push(fn);
  }

  public registerOnTouched(fn: TouchDelegate): void {
    this.touchListeners.push(fn);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: T): void {
    this.value = value;

    this.emitChangeValue(value);
  }

  protected emitChangeValue(value: T): void {
    this.changeListeners.forEach(item => {
      item(value);
    });
  }

  public emitTouch(event: MouseEvent | TouchEvent): void {
    this.touchListeners.forEach(item => {
      item(event);
    });
  }
}

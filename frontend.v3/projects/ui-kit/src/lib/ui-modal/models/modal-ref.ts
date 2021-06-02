import { Observable, Subject } from 'rxjs';
import { ComponentRef } from '@angular/core';

export class ModalRef<T = any> {
  public componentRef: ComponentRef<T>;
  public readonly close$: Observable<string>;
  private _close$: Subject<string> = new Subject<string>();

  public constructor(componentRef?: ComponentRef<T>) {
    this.close$ = this._close$.asObservable();
    this.componentRef = componentRef;
  }

  public get instance(): T {
    return this.componentRef.instance;
  }

  public close(reason?: string): void {
    this._close$.next(reason);
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestroyService extends Subject<void> implements OnDestroy {
  public constructor() {
    super();
  }

  public ngOnDestroy(): void {
    this.next();
  }
}

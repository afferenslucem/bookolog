import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExpansionPanelComponent } from '../components/expansion-panel/expansion-panel.component';

@Injectable({
  providedIn: 'root',
})
export class OpenDelegatorService {
  public open$: Observable<ExpansionPanelComponent>;
  private _open$: Subject<ExpansionPanelComponent> = new Subject<ExpansionPanelComponent>();

  constructor() {
    this.open$ = this._open$.asObservable();
  }

  public emitOpen(v: ExpansionPanelComponent): void {
    this._open$.next(v);
  }
}

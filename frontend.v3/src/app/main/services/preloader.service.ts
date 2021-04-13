import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  public shouldShow: Observable<boolean>;
  private _shouldShow = 0;
  private _showVotes = new Subject<number>();

  constructor() {
    this.shouldShow = this._showVotes.pipe(
      debounceTime(200),
      map(item => item > 0),
      tap(item => console.log(item)),
    );
  }

  public show(): void {
    this._shouldShow++;
    this._showVotes.next(this._shouldShow);
  }

  public hide(): void {
    this._shouldShow--;
    this._showVotes.next(this._shouldShow);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private readonly _title = new BehaviorSubject<string>('');
  private readonly _custom = new BehaviorSubject<string>('');

  constructor() {}

  public get title$(): Observable<string> {
    return this._title;
  }

  public get custom$(): Observable<string> {
    return this._custom;
  }

  public get title(): string {
    return this._title.getValue();
  }

  public get custom(): string {
    return this._custom.getValue();
  }

  public setCustom(title: string): void {
    this._custom.next(title);
    this._title.next(null);
  }

  public setTitle(title: string): void {
    this._custom.next(null);
    this._title.next(title);
  }
}

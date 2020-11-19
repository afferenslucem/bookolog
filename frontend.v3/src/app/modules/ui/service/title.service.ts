import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TitleText } from '../models/title-text';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly _title = new BehaviorSubject<TitleText>(0);

  constructor() { }

  public setInProgress(): void {
    this._title.next(TitleText.InProgress);
  }

  public setToRead(): void {
    this._title.next(TitleText.ToRead);
  }

  public setLogin(): void {
    this._title.next(TitleText.Login);
  }

  public get title$(): Observable<TitleText> {
    return this._title;
  }

  public get title(): TitleText {
    return this._title.getValue();
  }
}

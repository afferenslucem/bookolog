import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TitleText } from '../models/title-text';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly _title = new BehaviorSubject<TitleText>(0);

  constructor() { }

  public setBook(): void {
    this._title.next(TitleText.Book);
  }

  public setBookEdit(): void {
    this._title.next(TitleText.BookEdit);
  }

  public setBookCreate(): void {
    this._title.next(TitleText.BookCreate);
  }

  public setDoneList(): void {
    this._title.next(TitleText.DoneList);
  }

  public setInProgressList(): void {
    this._title.next(TitleText.InProgressList);
  }

  public setToReadList(): void {
    this._title.next(TitleText.ToReadList);
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

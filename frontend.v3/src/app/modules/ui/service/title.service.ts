import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TitleText } from '../models/title-text';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private readonly _title = new BehaviorSubject<TitleText>(0);
  private readonly _custom = new BehaviorSubject<string>('');

  constructor() {
  }

  public get title$(): Observable<TitleText> {
    return this._title;
  }

  public get custom$(): Observable<string> {
    return this._custom;
  }

  public get title(): TitleText {
    return this._title.getValue();
  }

  public get custom(): string {
    return this._custom.getValue();
  }

  public setBook(): void {
    this.setCustom(null);
    this.setTitle(TitleText.Book);
  }

  public setBookEdit(): void {
    this.setCustom(null);
    this.setTitle(TitleText.BookEdit);
  }

  public setBookCreate(): void {
    this.setCustom(null);
    this.setTitle(TitleText.BookCreate);
  }

  public setSettings(): void {
    this.setCustom(null);
    this.setTitle(TitleText.Settings);
  }

  public setDoneList(): void {
    this.setCustom(null);
    this.setTitle(TitleText.DoneList);
  }

  public setInProgressList(): void {
    this.setCustom(null);
    this.setTitle(TitleText.InProgressList);
  }

  public setToReadList(): void {
    this.setCustom(null);
    this.setTitle(TitleText.ToReadList);
  }

  public setLogin(): void {
    this.setCustom(null);
    this.setTitle(TitleText.Login);
  }

  public setRegistration(): void {
    this.setCustom(null);
    this.setTitle(TitleText.Registration);
  }

  public setRecoveryPassword(): void {
    this.setCustom(null);
    this.setTitle(TitleText.PasswordRecovery);
  }

  public setTagsStatistic(): void {
    this.setCustom(null);
    this.setTitle(TitleText.TagsStatistic);
  }

  public setYearsStatistic(): void {
    this.setCustom(null);
    this.setTitle(TitleText.YearsStatistic);
  }

  public setGenresStatistic(): void {
    this.setCustom(null);
    this.setTitle(TitleText.GenresStatistic);
  }

  public setAuthorsStatistic(): void {
    this.setCustom(null);
    this.setTitle(TitleText.AuthorsStatistic);
  }

  public setCollectionCreate(): void {
    this.setCustom(null);
    this.setTitle(TitleText.CollectionCreate);
  }


  public setCollectionEdit(): void {
    this.setCustom(null);
    this.setTitle(TitleText.CollectionEdit);
  }

  public setCollectionList(): void {
    this.setCustom(null);
    this.setTitle(TitleText.CollectionList);
  }

  public setCollectionView(): void {
    this.setCustom(null);
    this.setTitle(TitleText.CollectionView);
  }

  public setCustom(title: string): void {
    this._custom.next(title);
    this._title.next(null);
  }

  public setTitle(title: TitleText): void {
    this._custom.next(null);
    this._title.next(title);
  }
}

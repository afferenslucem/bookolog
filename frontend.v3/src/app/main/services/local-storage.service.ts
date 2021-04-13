import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public clear(): void {
    localStorage.clear();
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

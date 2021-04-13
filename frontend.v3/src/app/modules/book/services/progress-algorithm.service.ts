import { Injectable } from '@angular/core';
import { BookType } from '../models/book-type';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { LocalStorageService } from '../../../main/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressAlgorithmService {
  constructor(private localStorageService: LocalStorageService) {}

  public setAlgorithm(bookType: BookType, algorithm: ProgressAlgorithmType): void {
    const data = this.localStorageService.getItem('progressAlgorithmPreference');

    if (this.oneOfProgressType(data)) {
      this.createAndSaveSettings(bookType.toString(), algorithm);
    } else {
      this.appendToSettings(bookType.toString(), algorithm);
    }
  }

  public getAlgorithm(bookType: BookType): ProgressAlgorithmType {
    const data = this.localStorageService.getItem('progressAlgorithmPreference');

    if (!data) {
      return this.getDefault();
    } else if (this.oneOfProgressType(data)) {
      return this.asType(data);
    } else {
      return this.fromSettings(data, bookType.toString());
    }
  }

  public oneOfProgressType(type: string): boolean {
    return type === ProgressAlgorithmType.Done || type === ProgressAlgorithmType.Left;
  }

  private fromSettings(data: string, bookType: string): ProgressAlgorithmType {
    const settings = JSON.parse(data);

    const type = settings[bookType];

    if (type) {
      return this.asType(type);
    } else {
      return this.getDefault();
    }
  }

  private asType(data: string): ProgressAlgorithmType {
    return data as ProgressAlgorithmType;
  }

  private getDefault(): ProgressAlgorithmType {
    return ProgressAlgorithmType.Done;
  }

  private createAndSaveSettings(bookType: string, algorithm: ProgressAlgorithmType): void {
    const settings = {
      [bookType]: algorithm,
    };

    this.localStorageService.setItem('progressAlgorithmPreference', JSON.stringify(settings));
  }

  private appendToSettings(bookType: string, algorithm: ProgressAlgorithmType): void {
    const data = this.localStorageService.getItem('progressAlgorithmPreference') || '{}';

    const settings = JSON.parse(data) || {};

    settings[bookType] = algorithm;

    this.localStorageService.setItem('progressAlgorithmPreference', JSON.stringify(settings));
  }
}

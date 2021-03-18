import { BookType } from '../models/book-type';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';

export class ProgressAlgorithmSolver {
  public static setAlgorithm(bookType: BookType, algorithm: ProgressAlgorithmType): void {
    const data = localStorage.getItem('progressAlgorithmPreference');

    if (this.oneOfProgressType(data)) {
      this.createAndSaveSettings(bookType.toString(), algorithm);
    } else {
      this.appendToSettings(bookType.toString(), algorithm);
    }
  }

  public static getAlgorithm(bookType: BookType): ProgressAlgorithmType {
    const data = localStorage.getItem('progressAlgorithmPreference');

    if (!data) {
      return this.getDefault();
    } else if (this.oneOfProgressType(data)) {
      return this.asType(data);
    } else {
      return this.fromSettings(data, bookType.toString());
    }
  }

  public static oneOfProgressType(type: string): boolean {
    return type === ProgressAlgorithmType.Done || type === ProgressAlgorithmType.Left;
  }

  private static fromSettings(data: string, bookType: string): ProgressAlgorithmType {
    const settings = JSON.parse(data);

    const type = settings[bookType];

    if (type) {
      return this.asType(type);
    } else {
      return this.getDefault();
    }
  }

  private static asType(data: string): ProgressAlgorithmType {
    return data as ProgressAlgorithmType;
  }

  private static getDefault(): ProgressAlgorithmType {
    return ProgressAlgorithmType.Done;
  }

  private static createAndSaveSettings(bookType: string, algorithm: ProgressAlgorithmType): void {
    const settings = {
      [bookType]: algorithm,
    };

    localStorage.setItem('progressAlgorithmPreference', JSON.stringify(settings));
  }

  private static appendToSettings(bookType: string, algorithm: ProgressAlgorithmType): void {
    const data = localStorage.getItem('progressAlgorithmPreference') || '{}';

    const settings = JSON.parse(data) || {};

    settings[bookType] = algorithm;

    localStorage.setItem('progressAlgorithmPreference', JSON.stringify(settings));
  }
}

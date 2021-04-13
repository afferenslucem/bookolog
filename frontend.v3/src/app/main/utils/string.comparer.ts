import { IEqualityComparer } from 'declarray';

export class StringComparer implements IEqualityComparer<string> {
  public equal(first: string, second: string): boolean {
    return first.toUpperCase() === second.toUpperCase();
  }

  public getHashCode(object: string): string | number {
    return object.toLowerCase();
  }
}

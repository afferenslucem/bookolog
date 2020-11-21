import { IEqualityComparer } from 'declarray';

export class StringComparer implements IEqualityComparer<string>{
  public equal(first: string, seconds: string): boolean {
    return first.toUpperCase() === seconds.toUpperCase();
  }

  public getHashCode(object: string): string | number {
    return object;
  }
}

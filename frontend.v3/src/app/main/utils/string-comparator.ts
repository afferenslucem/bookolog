import { IEqualityComparator } from 'declarray';
import { DefaultComparator } from 'declarray/dist/utils/default-comparator';

export class StringComparator implements IEqualityComparator<string> {
  public equals(first: string, second: string): boolean {
    return first.toUpperCase() === second.toUpperCase();
  }

  public compare(first: string, second: string): number {
    return new DefaultComparator().compare(first.toUpperCase(), second.toUpperCase());
  }

  public getHashCode(object: string): number {
    return new DefaultComparator().getHashCode(object.toUpperCase());
  }
}

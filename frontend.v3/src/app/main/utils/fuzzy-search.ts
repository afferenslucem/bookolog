import _ from 'declarray';

export class FuzzySearch {
  public search(items: string[], pattern: string): string[] {
    return _(items)
      .where(item => item.indexOf(pattern) !== -1)
      .toArray();
  }
}

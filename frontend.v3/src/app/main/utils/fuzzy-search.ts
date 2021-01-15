import _ from 'declarray';

export class FuzzySearch {
  public search(items: string[], pattern: string): string[] {
    pattern = pattern.toLowerCase();

    return _(items)
      .where(item => item.toLowerCase().indexOf(pattern) !== -1)
      .toArray();
  }
}

import _ from 'declarray';

export class FuzzySearch {
  public search<T>(items: T[], pattern: string): T[] {
    pattern = pattern.trim().toLowerCase();

    if (pattern === '') {
      return items;
    }

    return _(items)
      .where(item => this.contains(item.toString(), pattern))
      .toArray();
  }

  public contains(line: string, pattern: string): boolean {
    return line.toLowerCase().indexOf(pattern) !== -1;
  }
}

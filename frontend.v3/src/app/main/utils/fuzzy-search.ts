import _ from 'declarray';

export class FuzzySearch {
  public search<T>(items: T[], pattern: string): T[] {
    if (pattern == null) {
      return items;
    }

    pattern = pattern.trim().toLowerCase();

    if (pattern === '') {
      return items;
    }

    return _(items)
      .where(item => this.contains(item.toString(), pattern))
      .toArray();
  }

  public searchAsync<T>(items: T[], pattern: string): Promise<T[]> {
    if (pattern == null) {
      return Promise.resolve(items);
    }

    pattern = pattern.trim().toLowerCase();

    if (pattern === '') {
      return Promise.resolve(items);
    }

    return _(items)
      .where(item => this.contains(item.toString(), pattern))
      .promisify()
      .toArray();
  }

  public contains(line: string, pattern: string): boolean {
    return line.toLowerCase().includes(pattern);
  }
}

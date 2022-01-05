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

  public contains(line: string, pattern: string): boolean {
    return line.toLowerCase().includes(pattern);
  }
}

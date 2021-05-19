import { StringComparator } from './string-comparator';

describe('StringComparer', () => {
  it('should create an instance', () => {
    expect(new StringComparator()).toBeTruthy();
  });

  it('should return false', () => {
    expect(new StringComparator().equals('asdf', 'aszxc')).toBeFalse();
  });

  it('should return true for same strings', () => {
    expect(new StringComparator().equals('qwerty', 'qwerty')).toBeTrue();
  });

  it('should return true for diff case strings', () => {
    expect(new StringComparator().equals('qwerty', 'QWERTY')).toBeTrue();
  });
});

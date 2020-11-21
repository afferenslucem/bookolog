import { StringComparer } from './string.comparer';

describe('StringComparer', () => {
  it('should create an instance', () => {
    expect(new StringComparer()).toBeTruthy();
  });

  it('should return false', () => {
    expect(new StringComparer().equal('asdf', 'aszxc')).toBeFalse();
  });

  it('should return true for same strings', () => {
    expect(new StringComparer().equal('qwerty', 'qwerty')).toBeTrue();
  });

  it('should return true for diff case strings', () => {
    expect(new StringComparer().equal('qwerty', 'QWERTY')).toBeTrue();
  });
});

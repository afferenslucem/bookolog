import { BookDate } from './book-date';

describe('BookDate', () => {
  it('should create empty instance', () => {
    const instance = new BookDate();

    expect(instance.year).toEqual(null);
    expect(instance.month).toEqual(null);
    expect(instance.day).toEqual(null);
  });

  it('should create copy of instance', () => {
    const instance = new BookDate({
      day: 2,
      month: 3,
      year: 2004,
    });

    expect(instance.day).toEqual(2);
    expect(instance.month).toEqual(3);
    expect(instance.year).toEqual(2004);
  });

  it('should create partial copy of instance', () => {
    const instance = new BookDate({
      year: 2004,
    });

    expect(instance.day).toEqual(null);
    expect(instance.month).toEqual(null);
    expect(instance.year).toEqual(2004);
  });
});

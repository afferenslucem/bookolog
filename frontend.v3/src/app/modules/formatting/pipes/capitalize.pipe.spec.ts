import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();

    expect(pipe).toBeTruthy();
  });

  it('capitalize qwerty to Qwerty', () => {
    const result = new CapitalizePipe().transform('qwerty');

    expect(result).toEqual('Qwerty');
  });

  it('capitalize array', () => {
    const result = new CapitalizePipe().transform(['qwerty', 'uiop']);

    expect(result).toEqual(['Qwerty', 'Uiop']);
  });

  it('capitalize QWERTY to QWERTY', () => {
    const result = new CapitalizePipe().transform('QWERTY');

    expect(result).toEqual('QWERTY');
  });

  it('capitalize skip undefined', () => {
    const result = new CapitalizePipe().transform(undefined);

    expect(result).toEqual(undefined);
  });
});

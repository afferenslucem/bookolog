import { MaxLengthPipe } from './max-length.pipe';

describe('MaxLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxLengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should cut string', () => {
    const pipe = new MaxLengthPipe();

    const result = pipe.transform('qwertyuiop', 6);

    expect(result).toEqual('qwerty…');
  });

  it('should keep length', () => {
    const pipe = new MaxLengthPipe();

    const result = pipe.transform('qwertyuiop', 16);

    expect(result).toEqual('qwertyuiop');
  });

  it('should keep length', () => {
    const pipe = new MaxLengthPipe();

    const result = pipe.transform('qwertyuiop');

    expect(result).toEqual('qwertyuiop');
  });
});

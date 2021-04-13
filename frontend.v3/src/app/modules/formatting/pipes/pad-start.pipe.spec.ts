import { PadStartPipe } from './pad-start.pipe';

describe('PadStartPipe', () => {
  it('create an instance', () => {
    const pipe = new PadStartPipe();

    expect(pipe).toBeTruthy();
  });

  it('should return 000333 for 333', () => {
    const result = new PadStartPipe().transform('333', '0', 6);

    expect(result).toEqual('000333');
  });

  it('should return 333 for 333', () => {
    const result = new PadStartPipe().transform('333', '0', 3);

    expect(result).toEqual('333');
  });

  it('should return 03 for 3', () => {
    const result = new PadStartPipe().transform('3', '0', 2);

    expect(result).toEqual('03');
  });
});

import { TimifyUnitsPipe } from './timify-units.pipe';

describe('TimifyUnitsPipe', () => {
  it('create an instance', () => {
    const pipe = new TimifyUnitsPipe();
    expect(pipe).toBeTruthy();
  });

  it('convert 0 to 00:00', () => {
    const result = new TimifyUnitsPipe().transform(0);
    expect(result).toEqual('00:00');
  });

  it('convert 60 to 01:00', () => {
    const result = new TimifyUnitsPipe().transform(60);
    expect(result).toEqual('01:00');
  });

  it('convert 713 to 11:53', () => {
    const result = new TimifyUnitsPipe().transform(713);
    expect(result).toEqual('11:53');
  });
});

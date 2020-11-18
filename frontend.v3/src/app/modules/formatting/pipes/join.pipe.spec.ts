import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  it('create an instance', () => {
    const pipe = new JoinPipe();
    expect(pipe).toBeTruthy();
  });

  it('join by comma', () => {
    const result = new JoinPipe().transform(['a', 'b', 'c']);
    expect(result).toEqual('a, b, c');
  });

  it('join by separator', () => {
    const result = new JoinPipe().transform(['a', 'b', 'c'], '|');
    expect(result).toEqual('a|b|c');
  });
});

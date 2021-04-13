import { ChooseFormPipe } from './choose-form.pipe';

describe('ChooseFormPipe', () => {
  it('create an instance', () => {
    const pipe = new ChooseFormPipe();

    expect(pipe).toBeTruthy();
  });

  it('should use first', () => {
    const pipe = new ChooseFormPipe();

    expect(pipe.transform(1, 'бутылка', null, null)).toEqual('бутылка');

    expect(pipe.transform(21, 'бутылка', null, null)).toEqual('бутылка');
  });

  it('should use second', () => {
    const pipe = new ChooseFormPipe();

    expect(pipe.transform(2, null, 'бутылки', null)).toEqual('бутылки');
    expect(pipe.transform(3, null, 'бутылки', null)).toEqual('бутылки');
    expect(pipe.transform(4, null, 'бутылки', null)).toEqual('бутылки');

    expect(pipe.transform(22, null, 'бутылки', null)).toEqual('бутылки');
    expect(pipe.transform(23, null, 'бутылки', null)).toEqual('бутылки');
    expect(pipe.transform(24, null, 'бутылки', null)).toEqual('бутылки');
  });

  it('should use third', () => {
    const pipe = new ChooseFormPipe();

    expect(pipe.transform(0, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(5, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(6, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(7, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(8, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(9, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(10, null, null, 'бутылок')).toEqual('бутылок');

    expect(pipe.transform(11, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(12, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(13, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(14, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(15, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(16, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(17, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(18, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(19, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(20, null, null, 'бутылок')).toEqual('бутылок');

    expect(pipe.transform(25, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(26, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(27, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(28, null, null, 'бутылок')).toEqual('бутылок');
    expect(pipe.transform(29, null, null, 'бутылок')).toEqual('бутылок');
  });
});

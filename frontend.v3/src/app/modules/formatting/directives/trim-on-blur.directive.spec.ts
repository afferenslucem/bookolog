import { TrimOnBlurDirective } from './trim-on-blur.directive';

describe('TrimOnBlurDirective', () => {
  it('should create an instance', () => {
    const directive = new TrimOnBlurDirective(null, null);

    expect(directive).toBeTruthy();
  });

  it('should trim value', () => {
    const directive = new TrimOnBlurDirective(null, null);

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue(' value ');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('value');
  });

  it('should trim with null value', () => {
    const directive = new TrimOnBlurDirective(null, {
      get value(): any {
        return null;
      },
    } as any);

    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();
    const expected: any = null;

    expect(setValueSpy).toHaveBeenCalledOnceWith(expected);
  });
});

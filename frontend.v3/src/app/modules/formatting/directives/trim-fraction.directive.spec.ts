import { TrimFractionDirective } from './trim-fraction.directive';

describe('TrimFractionDirective', () => {
  it('should create an instance', () => {
    const directive = new TrimFractionDirective(null, null);

    expect(directive).toBeTruthy();
  });

  it('should trim value', () => {
    const directive = new TrimFractionDirective(null, null);
    directive.length = 1;

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.12');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1.1');
  });

  it('should pass shorter int value', () => {
    const directive = new TrimFractionDirective(null, null);
    directive.length = 1;

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).not.toHaveBeenCalled();
  });

  it('should trim shorter fraction value ended with .', () => {
    const directive = new TrimFractionDirective(null, null);
    directive.length = 2;

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1.');
  });

  it('should trim shorter fraction value ended with num', () => {
    const directive = new TrimFractionDirective(null, null);
    directive.length = 2;

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.2');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1.2');
  });

  it('should shorter fraction value ended with num', () => {
    const directive = new TrimFractionDirective(null, null);
    directive.length = 2;

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.2');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1.2');
  });

  it('should trim by default', () => {
    const directive = new TrimFractionDirective(null, null);

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.2');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1');
  });

  it('should trim by default ended with point', () => {
    const directive = new TrimFractionDirective(null, null);

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('1.');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).toHaveBeenCalledOnceWith('1');
  });

  it('should pass empty string', () => {
    const directive = new TrimFractionDirective(null, null);

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue('');
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).not.toHaveBeenCalled();
  });

  it('should pass null', () => {
    const directive = new TrimFractionDirective(null, null);

    const getValueSpy = spyOnProperty(directive, 'value', 'get').and.returnValue(null);
    const setValueSpy = spyOnProperty(directive, 'value', 'set');

    directive.trim();

    expect(getValueSpy).toHaveBeenCalledOnceWith();
    expect(setValueSpy).not.toHaveBeenCalled();
  });
});

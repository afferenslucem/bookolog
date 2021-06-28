import { MaxDirective } from './max.directive';
import { ElementRef } from '@angular/core';

describe('MaxDirective', () => {
  let elRef: ElementRef<HTMLInputElement> = null;
  let directive: MaxDirective = null;

  beforeEach(() => {
    elRef = {
      nativeElement: {},
    } as ElementRef<HTMLInputElement>;
    directive = new MaxDirective(elRef);
  });

  it('should create an instance', () => {
    const directive = new MaxDirective(elRef);
    expect(directive).toBeTruthy();
  });

  it('should set max', () => {
    const directive = new MaxDirective(elRef);
    directive.max = '15';

    directive.ngOnInit();

    expect(elRef.nativeElement.max).toEqual('15');
  });

  it('should pass non number value', () => {
    const directive = new MaxDirective(elRef);
    directive.max = '15';

    const result = directive.validate({
      value: 'qwerty',
    } as any);

    expect(result).toEqual(null);
  });

  it('should pass correct value', () => {
    const directive = new MaxDirective(elRef);
    directive.max = '15';

    const result = directive.validate({
      value: 12,
    } as any);

    expect(result).toEqual(null);
  });

  it('should pass limit value', () => {
    const directive = new MaxDirective(elRef);
    directive.max = '15';

    const result = directive.validate({
      value: 15,
    } as any);

    expect(result).toEqual(null);
  });

  it('should return error', () => {
    const directive = new MaxDirective(elRef);
    directive.max = '15';

    const result = directive.validate({
      value: 16,
    } as any);

    expect(result).toEqual({
      max: 15,
      actual: 16,
    });
  });
});

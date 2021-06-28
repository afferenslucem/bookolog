import { MinDirective } from './min.directive';
import { ElementRef } from '@angular/core';

describe('MinDirective', () => {
  let elRef: ElementRef<HTMLInputElement> = null;
  let directive: MinDirective = null;

  beforeEach(() => {
    elRef = {
      nativeElement: {},
    } as ElementRef<HTMLInputElement>;
    directive = new MinDirective(elRef);
  });

  it('should create an instance', () => {
    const directive = new MinDirective(elRef);
    expect(directive).toBeTruthy();
  });

  it('should set min', () => {
    const directive = new MinDirective(elRef);
    directive.min = '15';

    directive.ngOnInit();

    expect(elRef.nativeElement.min).toEqual('15');
  });

  it('should pass non number value', () => {
    const directive = new MinDirective(elRef);
    directive.min = '15';

    const result = directive.validate({
      value: 'qwerty',
    } as any);

    expect(result).toEqual(null);
  });

  it('should pass correct value', () => {
    const directive = new MinDirective(elRef);
    directive.min = '0';

    const result = directive.validate({
      value: 2,
    } as any);

    expect(result).toEqual(null);
  });

  it('should pass limit value', () => {
    const directive = new MinDirective(elRef);
    directive.min = '0';

    const result = directive.validate({
      value: 0,
    } as any);

    expect(result).toEqual(null);
  });

  it('should return error', () => {
    const directive = new MinDirective(elRef);
    directive.min = '0';

    const result = directive.validate({
      value: -1,
    } as any);

    expect(result).toEqual({
      min: 0,
      actual: -1,
    });
  });
});

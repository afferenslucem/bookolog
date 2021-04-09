import { AbstractValidator } from './abstract-validator';

describe('AbstractValidator', () => {
  let validator: AbstractValidator = null;

  beforeEach(() => {
    validator = new AbstractValidator();
  })

  it('should create an instance', () => {
    expect(new AbstractValidator()).toBeTruthy();
  });

  describe('isEmptyErrors', () => {
    it('should return true for null', () => {
      expect(validator.isEmptyObject(null)).toBeTrue();
    });
    it('should return true for empty object', () => {
      expect(validator.isEmptyObject({})).toBeTrue();
    });
    it('should return false for filled object', () => {
      expect(validator.isEmptyObject({ error: true })).toBeFalse();
    });
  });

  describe('assignErrors', () => {
    it('should assign for null target', () => {
      const result = validator.assignErrors(null, { error: 'error' });

      expect(result).toEqual({ error: 'error' });
    });
    it('should assign for null source', () => {
      const result = validator.assignErrors({ error: 'error' }, null);

      expect(result).toEqual({ error: 'error' });
    });
    it('should assign', () => {
      const result = validator.assignErrors({ error: 'error' }, { error2: 'error2' });

      expect(result).toEqual({ error: 'error', error2: 'error2' });
    });
  });

  describe('clearErrors', () => {
    it('should clear for null target', () => {
      const result = validator.clearErrors(null, { error: 'error' });

      expect(result).toEqual(null);
    });
    it('should clear for null source', () => {
      const result = validator.clearErrors({ error: 'error' }, null);

      expect(result).toEqual({ error: 'error' });
    });
    it('should delete', () => {
      const result = validator.clearErrors({ error: 'error', error2: 'error2' }, { error: 'error2' });

      expect(result).toEqual({ error2: 'error2' });
    });
    it('should return null for empty result', () => {
      const result = validator.clearErrors({ error: 'error', error2: 'error2' }, { error: 'error2', error2: undefined });

      expect(result).toEqual(null);
    });
  });
});

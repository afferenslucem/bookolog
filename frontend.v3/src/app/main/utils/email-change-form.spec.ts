import { EmailForm } from './email-form';

describe('EmailChangeForm', () => {
  it('should create an instance', () => {
    expect(new EmailForm()).toBeTruthy();
  });

  describe('Accessors', () => {
    let form: EmailForm = null;

    beforeEach(() => {
      form = new EmailForm();
    });

    it('setter should set value', () => {
      form.value = 'email@domain.com';

      expect(form.nativeForm.get('email').value).toEqual('email@domain.com');
    });

    it('getter should return value', () => {
      form.nativeForm.get('email').setValue('email@domain.com');

      expect(form.value).toEqual('email@domain.com');
    });
  });

  it('initializer should init value', () => {
    const form = new EmailForm('email@domain.com');

    expect(form.value).toEqual('email@domain.com');
  });

  describe('Validation', () => {
    let form: EmailForm = null;

    beforeEach(() => {
      form = new EmailForm();
    });

    it('should return format error', () => {
      form.value = 'email@domain.';

      expect(form.errors.email).toBeTruthy();
      expect(form.invalid).toBeTruthy();
      expect(form.errorMessage).toEqual('Некорректный формат почты');
    });

    it('should return required error', () => {
      form.value = '';

      expect(form.errors.required).toBeTruthy();
      expect(form.invalid).toBeTrue();
      expect(form.errorMessage).toEqual('Это обязательное поле');
    });

    it('should return ok', () => {
      form.value = 'email@domain.com';

      expect(form.errors).toBeFalsy();
      expect(form.invalid).toBeFalse();
      expect(form.errorMessage).toEqual(null);
    });
  });
});

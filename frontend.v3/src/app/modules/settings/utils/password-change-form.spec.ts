import { PasswordChangeForm } from './password-change-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormValidators } from '../../../main/utils/FormValidators';

describe('PasswordChangeForm', () => {
  let form: PasswordChangeForm = null;

  beforeEach(() => {
    form = new PasswordChangeForm();
  });

  it('should create an instance', () => {
    expect(new PasswordChangeForm()).toBeTruthy();
  });

  describe('confirmationValidation', () => {
    it('should set error', () => {
      const formNative = new FormBuilder().group({
        password: new FormControl('qwerty'),
        confirmation: new FormControl('uiop'),
      });

      const formError = FormValidators.confirmationValidation(formNative);

      expect(formError.passwordMatch).toBeTruthy();

      expect(formNative.get('confirmation').errors?.passwordMatch).toBeTruthy();
    });

    it('should pass check', () => {
      const form = new FormBuilder().group({
        newPassword: new FormControl('qwerty'),
        passwordConfirmation: new FormControl('qwerty'),
      });

      const formError = FormValidators.confirmationValidation(form);

      expect(formError?.passwordMatch).toBeFalsy();

      expect(form.get('passwordConfirmation').errors?.passwordMatch).toBeFalsy();
    });
  });

  describe('Accessors', () => {
    describe('Getters', () => {
      it('currentPassword', () => {
        form.nativeForm.get('currentPassword').setValue('currentPassword');

        expect(form.currentPassword).toEqual('currentPassword');
      });

      it('password', () => {
        form.nativeForm.get('password').setValue('password');

        expect(form.newPassword).toEqual('password');
      });

      it('confirmation', () => {
        form.nativeForm.get('confirmation').setValue('confirmation');

        expect(form.passwordConfirmation).toEqual('confirmation');
      });
    });

    describe('Setters', () => {
      it('currentPassword', () => {
        form.currentPassword = 'currentPassword';

        expect(form.nativeForm.get('currentPassword').value).toEqual('currentPassword');
      });

      it('password', () => {
        form.newPassword = 'password';

        expect(form.nativeForm.get('password').value).toEqual('password');
      });

      it('confirmation', () => {
        form.passwordConfirmation = 'confirmation';

        expect(form.nativeForm.get('confirmation').value).toEqual('confirmation');
      });
    });
  });

  describe('Validation', () => {
    describe('currentPassword', () => {
      it('should be valid', () => {
        form.currentPassword = 'qwerty';

        expect(form.currentPasswordInvalid).toBeFalse();
        expect(form.currentPasswordErrorMessage).toEqual(null);
      });

      it('should be invalid', () => {
        form.currentPassword = '';

        expect(form.currentPasswordInvalid).toBeTrue();
        expect(form.currentPasswordErrorMessage).toEqual('Это обязательное поле');
      });
    });

    describe('newPassword', () => {
      it('should be valid', () => {
        form.newPassword = 'qwerty';

        expect(form.newPasswordInvalid).toBeFalse();
        expect(form.newPasswordErrorMessage).toEqual(null);
      });

      it('should be invalid', () => {
        form.newPassword = '';

        expect(form.newPasswordInvalid).toBeTrue();
        expect(form.newPasswordErrorMessage).toEqual('Это обязательное поле');
      });
    });

    describe('passwordConfirmation', () => {
      it('should be valid', () => {
        form.newPassword = 'qwerty';
        form.passwordConfirmation = 'qwerty';

        expect(form.passwordConfirmationInvalid).toBeFalse();
        expect(form.passwordConfirmationErrorMessage).toEqual(null);
      });

      it('should return required', () => {
        form.newPassword = '';
        form.passwordConfirmation = '';

        expect(form.passwordConfirmationInvalid).toBeTrue();
        expect(form.passwordConfirmationErrorMessage).toEqual('Это обязательное поле');
      });

      it('should return confirmation', () => {
        form.newPassword = 'qwerty';
        form.passwordConfirmation = 'uiop';

        expect(form.passwordConfirmationInvalid).toBeTrue();
        expect(form.passwordConfirmationErrorMessage).toEqual('Пароли не совпадают');
      });
    });

    describe('form', () => {
      it('should be valid', () => {
        form.currentPassword = 'qwerty';
        form.newPassword = 'uiop';
        form.passwordConfirmation = 'uiop';

        expect(form.invalid).toBeFalse();
      });

      it('should be invalid', () => {
        form.currentPassword = 'qwerty';
        form.newPassword = 'uiop';
        form.passwordConfirmation = 'uiop2';

        expect(form.invalid).toBeTrue();
      });
    });
  });

  it('should give access to value', () => {
    form.currentPassword = 'qwerty';
    form.newPassword = 'uiop';
    form.passwordConfirmation = 'uiop';

    expect(form.value).toEqual({
      currentPassword: 'qwerty',
      newPassword: 'uiop',
    });
  });
});

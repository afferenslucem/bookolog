import { RegistrationForm } from './registration-form';

describe('RegistrationForm', () => {
  let form: RegistrationForm = null;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  it('should create an instance', () => {
    expect(form).toBeTruthy();
  });

  describe('Accessors', () => {
    describe('Getters', () => {
      it('login', () => {
        form.nativeForm.get('login').setValue('login');

        expect(form.login).toEqual('login');
      });

      it('email', () => {
        form.nativeForm.get('email').setValue('email');

        expect(form.email).toEqual('email');
      });

      it('password', () => {
        form.nativeForm.get('password').setValue('password');

        expect(form.password).toEqual('password');
      });

      it('confirmation', () => {
        form.nativeForm.get('confirmation').setValue('confirmation');

        expect(form.confirmation).toEqual('confirmation');
      });
    });

    describe('Setters', () => {
      it('login', () => {
        form.login = 'login';

        expect(form.nativeForm.get('login').value).toEqual('login');
      });

      it('email', () => {
        form.email = 'email';

        expect(form.nativeForm.get('email').value).toEqual('email');
      });

      it('password', () => {
        form.password = 'password';

        expect(form.nativeForm.get('password').value).toEqual('password');
      });

      it('confirmation', () => {
        form.confirmation = 'confirmation';

        expect(form.nativeForm.get('confirmation').value).toEqual('confirmation');
      });
    });
  });

  describe('Validation', () => {
    describe('login', () => {
      it('should be valid', () => {
        form.login = 'qwerty';

        expect(form.loginInvalid).toBeFalse();
        expect(form.loginErrorMessage).toEqual(null);
      });

      it('should be invalid', () => {
        form.login = '';

        expect(form.loginInvalid).toBeTrue();
        expect(form.loginErrorMessage).toEqual('Это обязательное поле');
      });
    });

    describe('email', () => {
      it('should be valid', () => {
        form.email = 'qwerty@ui.op';

        expect(form.emailInvalid).toBeFalse();
        expect(form.emailErrorMessage).toEqual(null);
      });

      it('should be required error', () => {
        form.email = '';

        expect(form.emailInvalid).toBeTrue();
        expect(form.emailErrorMessage).toEqual('Это обязательное поле');
      });

      it('should be email error', () => {
        form.email = 'qwerty@er.';

        expect(form.emailInvalid).toBeTrue();
        expect(form.emailErrorMessage).toEqual('Некорректный формат почты');
      });
    });

    describe('password', () => {
      it('should be valid', () => {
        form.password = 'password';

        expect(form.passwordInvalid).toBeFalse();
        expect(form.passwordErrorMessage).toEqual(null);
      });

      it('should be required error', () => {
        form.password = '';

        expect(form.passwordInvalid).toBeTrue();
        expect(form.passwordErrorMessage).toEqual('Это обязательное поле');
      });
    });

    describe('confirmation', () => {
      it('should be valid', () => {
        form.password = 'qwerty';
        form.confirmation = 'qwerty';

        expect(form.confirmationInvalid).toBeFalse();
        expect(form.confirmationErrorMessage).toEqual(null);
      });

      it('should return required', () => {
        form.password = '';
        form.confirmation = '';

        expect(form.confirmationInvalid).toBeTrue();
        expect(form.confirmationErrorMessage).toEqual('Это обязательное поле');
      });

      it('should return confirmation error', () => {
        form.password = 'qwerty';
        form.confirmation = 'uiop';

        expect(form.confirmationInvalid).toBeTrue();
        expect(form.confirmationErrorMessage).toEqual('Пароли не совпадают');
      });
    });
  });

  it('should give access to value', () => {
    form.login = 'login';
    form.email = 'email@qwerty.uiop';
    form.password = 'password';
    form.confirmation = 'password';

    expect(form.value).toEqual({
      login: 'login',
      email: 'email@qwerty.uiop',
      password: 'password',
    });
  });
});

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let form: LoginForm = null;

  beforeEach(() => {
    form = new LoginForm();
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

      it('password', () => {
        form.nativeForm.get('password').setValue('password');

        expect(form.password).toEqual('password');
      });
    });

    describe('Setters', () => {
      it('login', () => {
        form.login = 'login';

        expect(form.nativeForm.get('login').value).toEqual('login');
      });

      it('password', () => {
        form.password = 'password';

        expect(form.nativeForm.get('password').value).toEqual('password');
      });
    });
  });

  describe('Validation', () => {
    describe('Login', () => {
      it('should be valid', () => {
        form.login = 'qwerty';

        expect(form.loginInvalid).toBeFalse();
      });

      it('should be invalid', () => {
        form.login = '';

        expect(form.loginInvalid).toBeTrue();
      });
    });

    describe('Password', () => {
      it('should be valid', () => {
        form.password = 'qwerty';

        expect(form.passwordInvalid).toBeFalse();
      });

      it('should be invalid', () => {
        form.password = '';

        expect(form.passwordInvalid).toBeTrue();
      });
    });
  });

  it('should return value', () => {
    form.login = 'login';
    form.password = 'password';

    const value = form.value;

    expect(value).toEqual({
      login: 'login',
      password: 'password',
    });
  });
});

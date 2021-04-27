import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../ui/ui.module';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormValidators } from '../../../../main/utils/FormValidators';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let auth: AuthService;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, UiModule],
    })
      .overrideComponent(RegistrationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    auth = TestBed.inject(AuthService);
    element = fixture.nativeElement;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set title', () => {
    component.ngOnInit();
  });

  describe('confirmationValidation', () => {
    it('show confirmation error', () => {
      const form = new FormBuilder().group({
        password: new FormControl('qwerty'),
        confirmation: new FormControl('uiop'),
      });

      const result = FormValidators.confirmationValidation(form);

      expect(result.passwordMatch).toBeTrue();
    });

    it('show no error', () => {
      const form = new FormBuilder().group({
        password: new FormControl('qwerty'),
        confirmation: new FormControl('qwerty'),
      });

      const result = FormValidators.confirmationValidation(form);

      expect(result?.passwordMatch).toBeFalsy();
    });
  });

  it('should send registration', async () => {
    const spy = spyOn(auth, 'registration').and.resolveTo();

    component.form.login = 'hrodvitnir';
    component.form.email = 'alexshakirov74@gmail.com';
    component.form.password = 'qwerty';
    component.form.confirmation = 'qwerty';

    expect(component.form.valid).toBeTrue();

    await component.submit();

    expect(spy).toHaveBeenCalledOnceWith({
      login: 'hrodvitnir',
      email: 'alexshakirov74@gmail.com',
      password: 'qwerty',
    });
  });

  describe('remote error', () => {
    it('should show email error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'User with same email already exisists',
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.EmailExists);
    });

    it('should show login error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'User with same login already exisists',
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.LoginExists);
    });

    it('should show login error for unexpected error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'Unexpected error',
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.Undefined);
    });
  });

  describe('local error', () => {
    describe('login', () => {
      it('should show error', () => {
        component.form.login = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.login-field mat-error').innerText).toEqual('Это обязательное поле');
      });

      it('should hide error', () => {
        component.form.login = 'login';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.login-field mat-error')?.innerText).toBeFalsy();
      });
    });

    describe('email', () => {
      it('should show required error', () => {
        component.form.email = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });

      it('should show format error', () => {
        component.form.email = 'email';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toEqual('Некорректный формат почты');
      });

      it('should hide error', () => {
        component.form.email = 'email@qwerty.uiop';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toBeFalsy();
      });
    });
  });

  describe('local error', () => {
    describe('login', () => {
      it('should show error', () => {
        component.form.login = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.login-field mat-error').innerText).toEqual('Это обязательное поле');
      });

      it('should hide error', () => {
        component.form.login = 'login';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.login-field mat-error')?.innerText).toBeFalsy();
      });
    });

    describe('email', () => {
      it('should show required error', () => {
        component.form.email = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });

      it('should show format error', () => {
        component.form.email = 'email';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toEqual('Некорректный формат почты');
      });

      it('should hide error', () => {
        component.form.email = 'email@qwerty.uiop';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.email-field mat-error')?.innerText).toBeFalsy();
      });
    });

    describe('password', () => {
      it('should show required error', () => {
        component.form.password = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.password-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });

      it('should hide error', () => {
        component.form.password = 'password';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.password-field mat-error')?.innerText).toBeFalsy();
      });
    });

    describe('password', () => {
      it('should show required error', () => {
        component.form.password = '';
        component.form.confirmation = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.confirmation-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });

      it('should show confirmation error', () => {
        component.form.password = 'qwerty';
        component.form.confirmation = 'uiop';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.confirmation-field mat-error')?.innerText).toEqual('Пароли не совпадают');
      });

      it('should hide error', () => {
        component.form.password = 'password';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.password-field mat-error')?.innerText).toBeFalsy();
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../ui/ui.module';
import { CredentialsException } from '../../exceptions/credentials.exception';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { LoginComponent } from './login.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPageComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthService;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        UiModule,
      ],
    })
      .overrideComponent(LoginComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    auth = TestBed.inject(AuthService);
    element = fixture.nativeElement;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('error', () => {
    it('should show credential error', async () => {
      const spy = jasmine.createSpy();
      spy.and.throwError(new CredentialsException());

      auth.login = spy;

      const event: any = {
        preventDefault: jasmine.createSpy()
      };

      await component.submit(event);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(element.querySelector<HTMLElement>('.login-error').innerText).toEqual('Неверные логин или пароль');
    });

    it('should show unexpected error', async () => {
      const loginSpy = spyOn(auth, 'login').and.rejectWith();

      const event: any = {
        preventDefault: jasmine.createSpy()
      };

      await component.submit(event);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledTimes(1);

      expect(element.querySelector<HTMLElement>('.login-error').innerText).toEqual('Неизвестная ошибка');
    });

    it('should hide error', async () => {
      const loginSpy = spyOn(auth, 'login');
      const navigateSpy = spyOn(router, 'navigate');
      const event: any = {
        preventDefault: jasmine.createSpy()
      };

      component.error = component.LoginError.Undefined;
      await component.submit(event);
      fixture.detectChanges();

      expect(component.error).toEqual(null);
    });
  });

  describe('should send credentials', () => {
    it('copy form', async () => {
      const loginSpy = spyOn(auth, 'login').and.resolveTo();

      component.form.get('login').setValue('hrodvitnir');
      component.form.get('password').setValue('qwerty');

      const event: any = {
        preventDefault: jasmine.createSpy()
      };
      await component.submit(event);

      expect(loginSpy).toHaveBeenCalledOnceWith({
        login: 'hrodvitnir',
        password: 'qwerty'
      });
    });
  });
});

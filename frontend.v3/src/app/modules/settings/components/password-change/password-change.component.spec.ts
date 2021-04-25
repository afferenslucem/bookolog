import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangePasswordError, PasswordChangeComponent } from './password-change.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PasswordChangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;
  let authService: AuthService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [PasswordChangeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .overrideComponent(PasswordChangeComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('send password', () => {
    it('should send data', () => {
      const spy = spyOn(authService, 'changePassword');

      component.form.currentPassword = 'qwerty';
      component.form.newPassword = 'uiop';

      component.submit();

      expect(spy).toHaveBeenCalledOnceWith('qwerty', 'uiop');
    });
  });

  describe('remote errors', () => {
    it('should show old password error', async () => {
      const spy = spyOn(authService, 'changePassword').and.rejectWith({
        error: 'Incorrect old password',
      });

      await component.submit();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.error).toEqual(ChangePasswordError.IncorrectOldPassword);
      expect(element.querySelector<HTMLElement>('.login-error').innerText).toBeTruthy();
    });

    it('should show unexpected error', async () => {
      const spy = spyOn(authService, 'changePassword').and.rejectWith({});

      await component.submit();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.error).toEqual(ChangePasswordError.Undefined);
      expect(element.querySelector<HTMLElement>('.login-error').innerText).toBeTruthy();
    });

    it('should hide error', async () => {
      const changeSpy = spyOn(authService, 'changePassword').and.resolveTo();
      const navigateSpy = spyOn(router, 'navigate').and.resolveTo();

      await component.submit();
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledTimes(1);

      expect(component.error).toBeFalsy();
      expect(element.querySelector<HTMLElement>('.login-error')?.innerText).toBeFalsy();
    });
  });

  describe('form errors', () => {
    describe('Current password', () => {
      it('should not show error', () => {
        component.form.currentPassword = 'qwerty';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.current-password-field mat-error')?.innerText).toBeFalsy();
      });

      it('should show error', () => {
        component.form.currentPassword = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.current-password-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });
    });

    describe('New password', () => {
      it('should not show error', () => {
        component.form.newPassword = 'qwerty';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.new-password-field mat-error')?.innerText).toBeFalsy();
      });

      it('should show error', () => {
        component.form.newPassword = '';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.new-password-field mat-error')?.innerText).toEqual('Это обязательное поле');
      });
    });

    describe('Confirmation password', () => {
      it('should not show error', () => {
        component.form.newPassword = 'qwerty';
        component.form.passwordConfirmation = 'qwerty';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.confirmation-password-field mat-error')?.innerText).toBeFalsy();
      });

      it('should show confirmation error', () => {
        component.form.newPassword = 'qwerty';
        component.form.passwordConfirmation = 'qwerty2';

        fixture.detectChanges();

        expect(element.querySelector<HTMLElement>('.confirmation-password-field mat-error')?.innerText).toEqual('Пароли не совпадают');
      });
    });
  });
});

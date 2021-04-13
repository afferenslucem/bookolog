import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangePasswordError, PasswordChangeComponent } from './password-change.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl } from '@angular/forms';
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

  describe('confirmationValidation', () => {
    it('should set error', () => {
      const form = new FormBuilder().group({
        newPassword: new FormControl('qwerty'),
        passwordConfirmation: new FormControl('uiop'),
      });

      const formError = component.confirmationValidation(form);

      expect(formError.passwordMatch).toBeTruthy();

      expect(form.get('passwordConfirmation').errors?.passwordMatch).toBeTruthy();
    });

    it('should pass check', () => {
      const form = new FormBuilder().group({
        newPassword: new FormControl('qwerty'),
        passwordConfirmation: new FormControl('qwerty'),
      });

      const formError = component.confirmationValidation(form);

      expect(formError?.passwordMatch).toBeFalsy();

      expect(form.get('passwordConfirmation').errors?.passwordMatch).toBeFalsy();
    });
  });

  describe('send password', () => {
    it('should send data', () => {
      const spy = spyOn(authService, 'changePassword');

      component.form.get('currentPassword').setValue('qwerty');
      component.form.get('newPassword').setValue('uiop');

      component.submit();

      expect(spy).toHaveBeenCalledOnceWith('qwerty', 'uiop');
    });
  });

  describe('error', () => {
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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../ui/ui.module';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TitleService } from '../../../ui/service/title.service';
import { RegistrationComponent } from './registration.component';
import { TitleText } from '../../../ui/models/title-text';
import { FormBuilder, FormControl } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let auth: AuthService;
  let element: HTMLElement;
  let router: Router;
  let title: TitleService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        UiModule,
      ],
    })
      .overrideComponent(RegistrationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        }
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
    title = TestBed.inject(TitleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set title', () => {
    component.ngOnInit();

    expect(title.title).toEqual(TitleText.Registration);
  });

  describe('confirmationValidation', () => {
    it('show confirmation error', () => {
      const form = new FormBuilder().group({
        password: new FormControl('qwerty'),
        confirmation: new FormControl('uiop'),
      });

      const result = component.confirmationValidation(form);

      expect(result.passwordMatch).toBeTrue();
    });

    it('show no error', () => {
      const form = new FormBuilder().group({
        password: new FormControl('qwerty'),
        confirmation: new FormControl('qwerty'),
      });

      const result = component.confirmationValidation(form);

      expect(result?.passwordMatch).toBeFalsy();
    });
  });

  it('should send registration', () => {
    const spy = spyOn(auth, 'registration').and.resolveTo();

    component.form.get('login').setValue('hrodvitnir');
    component.form.get('email').setValue('alexshakirov74@gmail.com');
    component.form.get('password').setValue('qwerty');
    component.form.get('confirmation').setValue('qwerty');

    expect(component.form.valid).toBeTrue();

    component.submit();

    expect(spy).toHaveBeenCalledOnceWith({
      login: 'hrodvitnir',
      email: 'alexshakirov74@gmail.com',
      password: 'qwerty',
    });
  });

  describe('error', () => {
    it('should show email error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'User with same email already exisists'
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.EmailExists);
    });

    it('should show login error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'User with same login already exisists'
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.LoginExists);
    });

    it('should show login error', async () => {
      const spy = spyOn(auth, 'registration').and.rejectWith({
        error: 'Unexpected error'
      });

      await component.submit();

      expect(component.error).toEqual(component.RegistrationError.Undefined);
    });
  });
});

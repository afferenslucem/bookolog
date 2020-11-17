import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CredentialsException } from '../../exceptions/credentials.exception';
import { AuthService } from '../../services/auth.service';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let auther: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      providers: [{
        provide: AuthService,
        useValue: {}
      }],
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    auther = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error', async () => {
    const spy = jasmine.createSpy();
    spy.and.throwError(new CredentialsException());

    auther.login = spy;

    const event: any = {
      preventDefault: jasmine.createSpy()
    };

    await component.submit(event);

    await fixture.whenStable();

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);

    // const error = fixture.nativeElement.querySelector('.login-error');
    // expect(error).toContain('Неверные логин или пароль');
  });
});

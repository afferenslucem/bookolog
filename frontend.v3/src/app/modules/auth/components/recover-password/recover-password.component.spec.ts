import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../ui/ui.module';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecoverPasswordComponent } from './recover-password.component';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let auth: AuthService;
  let element: HTMLElement;
  let router: Router;
  let title: TitleService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [RecoverPasswordComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        UiModule,
      ],
    })
      .overrideComponent(RecoverPasswordComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordComponent);
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

  it('should send recovery',  async () => {
    const recoverySpy = spyOn(auth, 'recoveryPassword');

    component.form.get('email').setValue('alexshakirov74@gmail.com');

    await component.submit();

    expect(recoverySpy).toHaveBeenCalledOnceWith('alexshakirov74@gmail.com');
  });

  it('should set title',  async () => {
    component.ngOnInit();

    expect(title.title).toEqual(TitleText.PasswordRecovery);
  });
});

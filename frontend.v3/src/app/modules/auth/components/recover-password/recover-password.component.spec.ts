import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../ui/ui.module';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecoverPasswordComponent } from './recover-password.component';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let auth: AuthService;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [RecoverPasswordComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, UiModule],
    })
      .overrideComponent(RecoverPasswordComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send recovery', async () => {
    const recoverySpy = spyOn(auth, 'recoveryPassword');

    component.form.value = 'alexshakirov74@gmail.com';

    await component.submit();

    expect(recoverySpy).toHaveBeenCalledOnceWith('alexshakirov74@gmail.com');
  });

  describe('local errors', () => {
    it('format error', () => {
      component.form.value = 'hrodvitnir';

      fixture.detectChanges();

      const error = element.querySelector<HTMLElement>('.email-field mat-error')?.innerHTML;

      expect(error).toEqual('Некорректный формат почты');
    });

    it('required error', () => {
      component.form.value = '';

      fixture.detectChanges();

      const error = element.querySelector<HTMLElement>('.email-field mat-error')?.innerHTML;

      expect(error).toEqual('Это обязательное поле');
    });

    it('hide error', () => {
      component.form.value = 'alexshakirov@gmail.com';

      fixture.detectChanges();

      const error = element.querySelector<HTMLElement>('.email-field mat-error')?.innerHTML;

      expect(error).toBeFalsy();
    });
  });
});

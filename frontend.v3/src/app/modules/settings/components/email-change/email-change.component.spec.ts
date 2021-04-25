import { EmailChangeComponent } from './email-change.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../user/services/user.service';

describe('EmailChangeComponent', () => {
  let component: EmailChangeComponent;
  let fixture: ComponentFixture<EmailChangeComponent>;
  let element: HTMLDivElement;
  let userService: UserService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [EmailChangeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            user: {
              email: 'alexshakirov74@gmail.com',
            },
            changeEmail(): void {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailChangeComponent);
    element = fixture.nativeElement;
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject email', () => {
    expect(component.email).toEqual('alexshakirov74@gmail.com');
  });

  it('should send email', () => {
    const spy = spyOn(userService, 'changeEmail');

    component.form.value = 'qwerty@ui.op';

    component.submit();

    expect(spy).toHaveBeenCalledOnceWith('qwerty@ui.op');
  });

  describe('Validation', () => {
    it('should show email format error', () => {
      component.form.value = 'alexshakirov74@gmail.';
      fixture.detectChanges();

      const error = element.querySelector<HTMLDivElement>('mat-error').innerText;

      expect(error).toEqual('Некорректный формат почты');
    });

    it('should show required error', () => {
      component.form.value = '';
      fixture.detectChanges();

      const error = element.querySelector<HTMLDivElement>('mat-error').innerText;

      expect(error).toEqual('Это обязательное поле');
    });

    it('should not show error', () => {
      component.form.value = 'alexshakirov74@gmail.com';
      fixture.detectChanges();

      const error = element.querySelector<HTMLDivElement>('mat-error')?.innerText;

      expect(error).toBeFalsy();
    });
  });
});

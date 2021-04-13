import { EmailChangeComponent } from './email-change.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../user/services/user.service';

describe('EmailChangeComponent', () => {
  let component: EmailChangeComponent;
  let fixture: ComponentFixture<EmailChangeComponent>;
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
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get email', () => {
    component.form.get('email').setValue('qwerty');

    expect(component.email).toEqual('qwerty');
  });

  it('should send email', () => {
    const spy = spyOn(userService, 'changeEmail');

    component.form.get('email').setValue('qwerty');

    component.submit();

    expect(spy).toHaveBeenCalledOnceWith('qwerty');
  });
});

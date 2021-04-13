import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { UserInfoComponent } from './user-info.component';
import { UserService } from '../../services/user.service';
import { BookService } from '../../../book/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookStatus } from '../../../book/models/book-status';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let userService: UserService;
  let bookService: BookService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            user: {
              login: 'hrodvitnir',
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);
    bookService = TestBed.inject(BookService);

    fixture.detectChanges();

    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('book count', () => {
    it('should hide', async () => {
      const spy = spyOn(bookService, 'getCountByStatus').and.resolveTo(0);

      component.ngOnInit();
      await component.count$;
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith(BookStatus.Done);
      expect(element.querySelector<HTMLElement>('.count')).toBeFalsy();
    });
  });

  describe('login', () => {
    it('should render', () => {
      expect(element.querySelector<HTMLElement>('.login').innerText).toEqual('hrodvitnir');
    });
  });

  describe('avatar', () => {
    it('should render', () => {
      userService.user.avatarName = 'name';

      fixture.detectChanges();

      expect(element.querySelector<HTMLElement>('.avatar')).toBeTruthy();
      expect(element.querySelector<HTMLElement>('.icon')).toBeFalsy();
    });

    it('should hide', () => {
      userService.user.avatarName = null;

      fixture.detectChanges();

      expect(element.querySelector<HTMLElement>('.avatar')).toBeFalsy();
      expect(element.querySelector<HTMLElement>('.icon')).toBeTruthy();
    });
  });
});

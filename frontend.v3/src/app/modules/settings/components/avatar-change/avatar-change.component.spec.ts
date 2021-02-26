import { AvatarChangeComponent } from './avatar-change.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../user/services/user.service';

describe('FileInputComponent', () => {
  let component: AvatarChangeComponent;
  let fixture: ComponentFixture<AvatarChangeComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [AvatarChangeComponent],
      imports: [
        HttpClientTestingModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set event', () => {
    component.imageSelected({
      id: 'event',
    } as any);

    expect(component.fileEvent).toEqual({
      id: 'event',
    } as any);
  });

  it('should save image', () => {
    component.imageCropped({
      base64: 'base64',
      file: 'file',
    } as any);

    expect(component.base64).toEqual('base64');

    // @ts-ignore
    expect(component.image).toEqual('file');
  });

  it('should set avatar', () => {
    const spy = spyOn(userService, 'setAvatar');

    component.image = {
      id: 'file'
    } as any;

    component.submit();

    expect(spy).toHaveBeenCalledOnceWith({
      id: 'file'
    } as any);
  });
});

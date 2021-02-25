import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationAreaComponent } from './notification-area.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('NotificationsAreaComponent', () => {
  let component: NotificationAreaComponent;
  let fixture: ComponentFixture<NotificationAreaComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ NotificationAreaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

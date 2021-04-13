import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseIconComponent } from './close-icon.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('CloseIconComponent', () => {
  let component: CloseIconComponent;
  let fixture: ComponentFixture<CloseIconComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CloseIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

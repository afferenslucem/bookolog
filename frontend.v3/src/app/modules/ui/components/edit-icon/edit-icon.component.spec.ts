import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditIconComponent } from './edit-icon.component';

describe('EditIconComponent', () => {
  let component: EditIconComponent;
  let fixture: ComponentFixture<EditIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIconComponent ],
      imports: [
        MatIconModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

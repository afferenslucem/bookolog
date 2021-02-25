import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlusIconComponent } from './plus-icon.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('PlusIconComponent', () => {
  let component: PlusIconComponent;
  let fixture: ComponentFixture<PlusIconComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ PlusIconComponent ],
      imports: [
        MatIconModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

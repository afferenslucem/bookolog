import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TagValueComponent } from './tag-value.component';

describe('TagValueComponent', () => {
  let component: TagValueComponent;
  let fixture: ComponentFixture<TagValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagValueComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

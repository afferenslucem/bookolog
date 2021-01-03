import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagValueComponent } from './tag-value.component';

describe('TagValueComponent', () => {
  let component: TagValueComponent;
  let fixture: ComponentFixture<TagValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagValueComponent ]
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

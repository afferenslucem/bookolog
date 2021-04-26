import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListPlaceholderComponent } from './empty-list-placeholder.component';

describe('EmptyListPlaceholderComponent', () => {
  let component: EmptyListPlaceholderComponent;
  let fixture: ComponentFixture<EmptyListPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyListPlaceholderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressingBookComponent } from './progressing-book.component';

describe('ProgressingBookComponent', () => {
  let component: ProgressingBookComponent;
  let fixture: ComponentFixture<ProgressingBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressingBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

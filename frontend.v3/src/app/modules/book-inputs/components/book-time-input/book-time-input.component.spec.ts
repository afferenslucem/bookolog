import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTimeInputComponent } from './book-time-input.component';

describe('BookTimeInputComponent', () => {
  let component: BookTimeInputComponent;
  let fixture: ComponentFixture<BookTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTimeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

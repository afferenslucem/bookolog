import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookTimeInputComponent } from './book-time-input.component';

describe('BookTimeInputComponent', () => {
  let component: BookTimeInputComponent;
  let fixture: ComponentFixture<BookTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTimeInputComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
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

  it('should set nulls', () => {
    component.writeValue(0);

    const value = component.form.value;

    expect(value).toEqual({
      hours: null,
      minutes: null,
    });
  });

  it('should set minutes', () => {
    component.writeValue(45);

    const value = component.form.value;

    expect(value).toEqual({
      hours: null,
      minutes: 45,
    });
  });

  it('should set hours', () => {
    component.writeValue(60);

    const value = component.form.value;

    expect(value).toEqual({
      hours: 1,
      minutes: null,
    });
  });

  it('should set hours and minutes', () => {
    component.writeValue(105);

    const value = component.form.value;

    expect(value).toEqual({
      hours: 1,
      minutes: 45,
    });
  });

  it('should emit change', () => {
    const spy = spyOn(component, 'emitChangeValue');

    component.form.get('hours').setValue('1');
    component.form.get('minutes').setValue('10');

    expect(spy).toHaveBeenCalledWith(60);
    expect(spy).toHaveBeenCalledWith(70);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});

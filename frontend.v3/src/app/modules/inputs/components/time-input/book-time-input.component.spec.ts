import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookTimeInputComponent } from './book-time-input.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('BookTimeInputComponent', () => {
  let component: BookTimeInputComponent;
  let fixture: ComponentFixture<BookTimeInputComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookTimeInputComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
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
    component.writeValue({
      hours: null,
      minutes: null,
    });

    const value = component.form.value;

    expect(value).toEqual({
      hours: null,
      minutes: null,
    });
  });

  it('should set minutes', () => {
    component.form.get('minutes').setValue('45');

    const value = component.form.value;

    expect(value).toEqual({
      hours: null,
      minutes: '45',
    });
  });

  it('should set hours', () => {
    component.form.get('hours').setValue('1');

    const value = component.form.value;

    expect(value).toEqual({
      hours: '1',
      minutes: null,
    });
  });

  it('should set hours and minutes', () => {
    component.writeValue({
      hours: 1,
      minutes: 45,
    });

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

    expect(spy).toHaveBeenCalledWith({
      hours: '1',
      minutes: null,
    });

    expect(spy).toHaveBeenCalledWith({
      hours: '1',
      minutes: '10',
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });
});

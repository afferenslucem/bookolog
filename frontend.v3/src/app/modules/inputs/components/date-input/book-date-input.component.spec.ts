import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDateInputComponent } from './book-date-input.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { FormBuilder, FormControl } from '@angular/forms';
import {BookDate} from '../../../book/models/book-date';

describe('BookDateInputComponent', () => {
  let component: BookDateInputComponent;
  let fixture: ComponentFixture<BookDateInputComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookDateInputComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dayValidator', () => {
    it('should return invalidMonth', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(null),
        day: new FormControl(21),
      });

      const result = component.dayValidator(form);

      expect(result.invalidMonth).toBeTrue();
      expect(result.invalidYear).toBeFalsy();
    });

    it('should return invalidYear', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl('12'),
        day: new FormControl(21),
      });

      const result = component.dayValidator(form);

      expect(result.invalidMonth).toBeFalsy();
      expect(result.invalidYear).toBeTrue();
    });

    it('should return both', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl(null),
        day: new FormControl(21),
      });

      const result = component.dayValidator(form);

      expect(result.invalidMonth).toBeTrue();
      expect(result.invalidYear).toBeTrue();
    });

    it('should return no errors', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(12),
        day: new FormControl(21),
      });

      const result = component.dayValidator(form);

      expect(result).toEqual(null);
    });
  });

  describe('monthValidator', () => {
    it('should return invalidYear', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl('12'),
      });

      const result = component.monthValidator(form);

      expect(result.invalidYear).toBeTrue();
    });

    it('should return no errors', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(12),
      });

      const result = component.monthValidator(form);

      expect(result).toEqual(null);
    });
  });

  describe('writeValue', () => {
    it('should write date', () => {
      component.form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl(null),
        day: new FormControl(null),
      });

      component.writeValue({
        year: 1997,
        month: 11,
        day: 23
      });

      const result = component.form.value;

      expect(result).toEqual({
        year: 1997,
        month: 11,
        day: 23
      });

      expect(component.value).toEqual({
        year: 1997,
        month: 11,
        day: 23
      });
    });

    it('should set empty', () => {
      component.form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl(null),
        day: new FormControl(null),
      });

      component.writeValue({
      });

      const result = component.form.value;

      expect(result).toEqual({
        year: null,
        month: null,
        day: null
      });
    });
  });

  it('writeBookDate', () => {
    component.writeBookDate({
      year: 2021,
      month: 4,
      day: 9
    });

    expect(component.form.value).toEqual({
      year: 2021,
      month: 4,
      day: 9
    });
  });

  it('writeCalendarDate', () => {
    component.writeCalendarDate({
      year: 2021,
      month: 4,
      day: 9
    });

    expect(component.dateControl.value).toEqual(new Date(2021, 3, 9));
  });

  it('onBookDateChange', () => {
    const writeCalendarDateSpy = spyOn(component, 'writeCalendarDate');
    const emitChangeValueSpy = spyOn(component, 'emitChangeValue');

    const arg: BookDate = {
      year: 2021,
      month: 4,
      day: 9
    };

    component.onBookDateChange(arg);

    expect(writeCalendarDateSpy).toHaveBeenCalledOnceWith(arg);
    expect(emitChangeValueSpy).toHaveBeenCalledOnceWith(arg);
    expect(component.value).toEqual(arg);
  });

  it('onCalendarDateChange', () => {
    const writeBookDateSpy = spyOn(component, 'writeBookDate');
    const emitChangeValueSpy = spyOn(component, 'emitChangeValue');

    const arg: Date = new Date(2021, 3, 9);

    const expected: BookDate = {
      year: 2021,
      month: 4,
      day: 9
    };

    component.onCalendarDateChange(arg);

    expect(writeBookDateSpy).toHaveBeenCalledOnceWith(expected);
    expect(emitChangeValueSpy).toHaveBeenCalledOnceWith(expected);
  });

  describe('ifEmptyErrors', () => {
    it('should return true for null', () => {
      expect(component.isEmptyObject(null)).toBeTrue();
    });
    it('should return true for empty object', () => {
      expect(component.isEmptyObject({})).toBeTrue();
    });
    it('should return false for filled object', () => {
      expect(component.isEmptyObject({ error: true })).toBeFalse();
    });
  });
});

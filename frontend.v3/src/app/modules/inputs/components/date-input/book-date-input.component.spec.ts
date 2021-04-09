import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDateInputComponent } from './book-date-input.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { FormBuilder, FormControl } from '@angular/forms';
import {BookDate} from '../../../book/models/book-date';
import { DateUtils } from '../../../../main/utils/date-utils';

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

  describe('openPicker', () => {
    it('should fill if empty date', () => {
      const pickerMock = {
        open: jasmine.createSpy()
      };

      const writeValueSpy = spyOn(component, 'writeValue');
      const emitChangeValueSpy = spyOn(component, 'emitChangeValue');

      component.value = {
        day: null,
        month: null,
        year: null,
      };

      component.openPicker(pickerMock);

      expect(writeValueSpy).toHaveBeenCalledOnceWith(DateUtils.today);
      expect(emitChangeValueSpy).toHaveBeenCalledOnceWith(DateUtils.today);
      expect(pickerMock.open).toHaveBeenCalledOnceWith();
    });

    it('should pass if filled', () => {
      const pickerMock = {
        open: jasmine.createSpy()
      };

      const writeValueSpy = spyOn(component, 'writeValue');
      const emitChangeValueSpy = spyOn(component, 'emitChangeValue');

      component.value = {
        day: 2021,
        month: 4,
        year: 9,
      };

      component.openPicker(pickerMock);

      expect(writeValueSpy).not.toHaveBeenCalled();
      expect(emitChangeValueSpy).not.toHaveBeenCalled();
      expect(pickerMock.open).toHaveBeenCalledOnceWith();
    });
  });
});

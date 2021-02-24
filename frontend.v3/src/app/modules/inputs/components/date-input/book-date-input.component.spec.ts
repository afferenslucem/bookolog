import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDateInputComponent } from './book-date-input.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { FormBuilder, FormControl } from '@angular/forms';

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
});

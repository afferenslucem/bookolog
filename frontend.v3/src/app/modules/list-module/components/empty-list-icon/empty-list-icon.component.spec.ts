import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListIconComponent } from './empty-list-icon.component';
import { LocalStorageService } from '../../../../main/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

describe('EmptyListItemComponent', () => {
  let component: EmptyListIconComponent;
  let fixture: ComponentFixture<EmptyListIconComponent>;
  let localStorageService: LocalStorageService = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyListIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onError', () => {
    it('should increment retry', () => {
      expect(component.retries).toEqual(0);

      component.onError();
      component.onError();

      expect(component.retries).toEqual(2);
    });

    it('should set isFailed for 3 calls', () => {
      component.onError();
      component.onError();

      expect(component.isFailed).toBeFalse();

      component.onError();

      expect(component.isFailed).toBeTrue();
    });
  });

  describe('setToArray', () => {
    it('should return empty array', () => {
      const set = new Set<number>();

      const result = component.setToArray(set);

      expect(result).toEqual([]);
    });

    it('should return array', () => {
      const set = new Set([1, 2, 3]);

      const result = component.setToArray(set);

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('chooseRandomIcon', () => {
    it('should return one of array item', () => {
      const set = new Set([1, 2, 3]);

      for (let i = 0; i < 100; i++) {
        const result = component.chooseRandomIcon(set);

        expect(result).toBeLessThanOrEqual(3);
        expect(result).toBeGreaterThanOrEqual(1);
      }
    });

    it('should return null for empty set', () => {
      const set = new Set([]);

      const result = component.chooseRandomIcon(set);

      expect(result).toBeNull();
    });
  });

  describe('readIconSet', () => {
    let getItemSpy: jasmine.Spy = null;

    beforeEach(() => {
      getItemSpy = spyOn(localStorageService, 'getItem');
    });

    it('should return null for undefined', () => {
      getItemSpy.and.returnValue(undefined);

      const set = component.readIconSet();

      expect(set).toEqual(new Set());
    });

    it('should return set for [1, 2, 3]', () => {
      getItemSpy.and.returnValue('[1, 2, 3]');

      const set = component.readIconSet();

      expect(set).toEqual(new Set([1, 2, 3]));
    });
  });

  describe('writeIconSet', () => {
    let getItemSpy: jasmine.Spy = null;
    let setItemSpy: jasmine.Spy = null;

    beforeEach(() => {
      getItemSpy = spyOn(localStorageService, 'getItem');
      setItemSpy = spyOn(localStorageService, 'setItem');
    });

    it('should writeSet', () => {
      const set = new Set([1, 2, 3]);

      component.writeIconSet(set);

      expect(setItemSpy).toHaveBeenCalledOnceWith('knownIcons', '[1,2,3]');
    });

    it('should append id', () => {
      getItemSpy.and.returnValue('[1, 2, 3]');
      component.id = new BehaviorSubject<number>(4);

      component.appendKnownIcon();

      expect(setItemSpy).toHaveBeenCalledOnceWith('knownIcons', '[1,2,3,4]');
    });
  });
});

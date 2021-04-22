import { TestBed } from '@angular/core/testing';

import { ProgressAlgorithmService } from './progress-algorithm.service';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { LocalStorageService } from '../../../main/services/local-storage.service';
import { BookType } from '../models/book-type';

describe('ProgressAlgorithmService', () => {
  let service: ProgressAlgorithmService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(ProgressAlgorithmService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('oneOfProgressType', () => {
    expect(service.oneOfProgressType(ProgressAlgorithmType.Left)).toBeTrue();
    expect(service.oneOfProgressType(ProgressAlgorithmType.Done)).toBeTrue();
    expect(service.oneOfProgressType('')).toBeFalse();
  });

  describe('getAlgorithm', () => {
    let getItemSpy: jasmine.Spy = null;

    beforeEach(() => {
      getItemSpy = spyOn(localStorageService, 'getItem');
    });

    afterEach(() => {
      expect(getItemSpy).toHaveBeenCalledOnceWith('progressAlgorithmPreference');
    });

    it('should return default for null', () => {
      getItemSpy.and.returnValue(null);

      const expected = ProgressAlgorithmType.Done;
      const result = service.getAlgorithm(BookType.Audio);

      expect(result).toEqual(expected);
    });

    it('should return default for undefined', () => {
      getItemSpy.and.returnValue(undefined);

      const expected = ProgressAlgorithmType.Done;
      const result = service.getAlgorithm(BookType.Audio);

      expect(result).toEqual(expected);
    });

    it("should return Left for returned single string 'Left'", () => {
      getItemSpy.and.returnValue('Left');

      const expected = ProgressAlgorithmType.Left;
      const result = service.getAlgorithm(BookType.Audio);

      expect(result).toEqual(expected);
    });

    it("should return Done for returned single 'Done'", () => {
      getItemSpy.and.returnValue('Done');

      const expected = ProgressAlgorithmType.Done;
      const result = service.getAlgorithm(BookType.Audio);

      expect(result).toEqual(expected);
    });

    it('should return saved value for type', () => {
      getItemSpy.and.returnValue('{"2": "Left"}');

      const expected = ProgressAlgorithmType.Left;
      const result = service.getAlgorithm(BookType.Audio);

      expect(result).toEqual(expected);
    });

    it('should return default value for unexpected type', () => {
      getItemSpy.and.returnValue('{"2": "Left"}');

      const expected = ProgressAlgorithmType.Done;
      const result = service.getAlgorithm(BookType.Paper);

      expect(result).toEqual(expected);
    });
  });

  describe('setAlgorithm', () => {
    let getItemSpy: jasmine.Spy = null;
    let setItemSpy: jasmine.Spy = null;

    beforeEach(() => {
      getItemSpy = spyOn(localStorageService, 'getItem');
      setItemSpy = spyOn(localStorageService, 'setItem');
    });

    afterEach(() => {
      expect(getItemSpy).toHaveBeenCalledOnceWith('progressAlgorithmPreference');
    });

    it('should create settings for undefined value', () => {
      getItemSpy.and.returnValue(null);

      service.setAlgorithm(BookType.Audio, ProgressAlgorithmType.Left);

      const expected = JSON.stringify({ [BookType.Audio]: 'Left' });

      expect(setItemSpy).toHaveBeenCalledOnceWith('progressAlgorithmPreference', expected);
    });

    it('should append to existing settings', () => {
      getItemSpy.and.returnValue(JSON.stringify({ [BookType.Audio]: 'Left' }));

      service.setAlgorithm(BookType.Electronic, ProgressAlgorithmType.Done);

      const expected = JSON.stringify({ [BookType.Audio]: 'Left', [BookType.Electronic]: 'Done' });

      expect(setItemSpy).toHaveBeenCalledOnceWith('progressAlgorithmPreference', expected);
    });

    it('should create settings for single string value', () => {
      getItemSpy.and.returnValue('Left');

      service.setAlgorithm(BookType.Electronic, ProgressAlgorithmType.Done);

      const expected = JSON.stringify({ [BookType.Electronic]: 'Done' });

      expect(setItemSpy).toHaveBeenCalledOnceWith('progressAlgorithmPreference', expected);
    });
  });
});

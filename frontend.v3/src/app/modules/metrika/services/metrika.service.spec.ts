import { TestBed } from '@angular/core/testing';
import { MetrikaService } from './metrika.service';
import { MetrikaEvent } from '../models/metrikaEvent';
import metrika from '../utils/metrika';
import { MetrikaModule } from '../metrika.module';

describe('MetrikaService', () => {
  let service: MetrikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MetrikaModule],
    });
    service = TestBed.inject(MetrikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fireEvent', () => {
    let fireSpy: jasmine.Spy;

    beforeEach(() => {
      fireSpy = spyOn(service, 'fireEvent');
    });

    it('should fire bookCreate', () => {
      service.fireBookCreate();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.BookCreate);
    });

    it('should fire bookUpdate', () => {
      service.fireBookUpdate();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.BookUpdate);
    });

    it('should fire bookDelete', () => {
      service.fireBookDelete();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.BookDelete);
    });

    it('should fire collectionCreate', () => {
      service.fireCollectionCreate();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.CollectionCreate);
    });

    it('should fire collectionUpdate', () => {
      service.fireCollectionUpdate();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.CollectionUpdate);
    });

    it('should fire collectionDelete', () => {
      service.fireCollectionDelete();

      expect(fireSpy).toHaveBeenCalledOnceWith(MetrikaEvent.CollectionDelete);
    });
  });

  describe('nativeLib', () => {
    let nativeSpy: jasmine.Spy;

    beforeEach(() => {
      nativeSpy = spyOn(metrika, 'native');
    });

    it('should fire bookCreate', () => {
      service.fireEvent(MetrikaEvent.BookCreate);

      expect(nativeSpy).toHaveBeenCalledOnceWith(MetrikaEvent.BookCreate);
    });
  });
});

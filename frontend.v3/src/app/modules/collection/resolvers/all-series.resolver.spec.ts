import { TestBed } from '@angular/core/testing';
import { CollectionService } from '../services/collection.service';
import { AllSeriesResolver } from './all-series.resolver';

describe('AllSeriesResolver', () => {
  let resolver: AllSeriesResolver;
  let spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CollectionService,
          useValue: {
            getAll: spy,
          }
        }
      ]
    });
    resolver = TestBed.inject(AllSeriesResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', async () => {
    const collections = await resolver.resolve(null, null);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

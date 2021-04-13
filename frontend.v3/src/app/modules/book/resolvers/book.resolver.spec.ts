import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionService } from '../../collection/services/collection.service';
import { BookService } from '../services/book.service';
import { BookResolver } from './book.resolver';

describe('BookResolver', () => {
  let resolver: BookResolver;
  const bookSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy().and.resolveTo({
    collectionGuid: 'collectionGuid',
  });
  const collectionSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy().and.resolveTo({});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getByGuid: bookSpy,
          },
        },
        {
          provide: CollectionService,
          useValue: {
            getByGuid: collectionSpy,
          },
        },
      ],
    });
    resolver = TestBed.inject(BookResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests book', async () => {
    const guidSpy = jasmine.createSpy().and.returnValue('guid1');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: guidSpy,
      },
    } as any;

    const status = await resolver.resolve(route);

    expect(bookSpy).toHaveBeenCalledWith('guid1');
    expect(bookSpy).toHaveBeenCalledTimes(1);

    expect(collectionSpy).toHaveBeenCalledWith('collectionGuid');
    expect(collectionSpy).toHaveBeenCalledTimes(1);

    expect(guidSpy).toHaveBeenCalledWith('guid');
    expect(guidSpy).toHaveBeenCalledTimes(1);
  });
});

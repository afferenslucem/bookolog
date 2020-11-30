import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { BookResolver } from './book.resolver';

describe('BookResolver', () => {
  let resolver: BookResolver;
  let spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getByGuid: spy,
          }
        }
      ]
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

    const status = await resolver.resolve(route, null);

    expect(spy).toHaveBeenCalledWith('guid1');
    expect(spy).toHaveBeenCalledTimes(1);

    expect(guidSpy).toHaveBeenCalledWith('guid');
    expect(guidSpy).toHaveBeenCalledTimes(1);
  });
});

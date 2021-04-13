import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from '../services/book.service';
import { BookReadingsResolver } from './book-readings.resolver';

describe('BookReadingsResolver', () => {
  let resolver: BookReadingsResolver;
  const booksSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getAllReadings: booksSpy,
          },
        },
      ],
    });
    resolver = TestBed.inject(BookReadingsResolver);
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

    expect(booksSpy).toHaveBeenCalledWith('guid1');
    expect(booksSpy).toHaveBeenCalledTimes(1);
  });
});

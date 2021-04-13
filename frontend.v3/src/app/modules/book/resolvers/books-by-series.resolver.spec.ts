import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { BooksBySeriesResolver } from './books-by-series.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';

describe('BooksBySeriesResolver', () => {
  let resolver: BooksBySeriesResolver;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: UUIDGeneratorService, useValue: {} }],
    });
    resolver = TestBed.inject(BooksBySeriesResolver);
    bookService = TestBed.inject(BookService);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests booksByService', async () => {
    const spy = spyOn(bookService, 'getByCollection').and.resolveTo([
      {
        guid: 'id1',
      } as any,
    ]);

    const result = await resolver.resolve({
      paramMap: new Map([['guid', 'id1']]),
    } as any);

    expect(spy).toHaveBeenCalledOnceWith('id1');
    expect(result).toEqual([
      {
        guid: 'id1',
      } as any,
    ]);
  });
});

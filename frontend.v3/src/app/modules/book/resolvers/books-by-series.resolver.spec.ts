import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { BooksByGenreResolver } from './books-by-genre.resolver';
import {BooksBySeriesResolver} from './books-by-series.resolver';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../user/services/user.service';
import {UUIDGeneratorService} from '../../../main/services/u-u-i-d-generator.service';

describe('BooksBySeriesResolver', () => {
  let resolver: BooksBySeriesResolver;
  let bookService: BookService;

  const booksValue: Book[] = [{
    name: 'name1',
    genre: 'genre1',
  }, {
    name: 'name2',
    genre: 'genre1',
  }, {
    name: 'name3',
    genre: 'genre2',
  }] as any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UUIDGeneratorService, useValue: {} },
      ]
    });
    resolver = TestBed.inject(BooksBySeriesResolver);
    bookService = TestBed.inject(BookService);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests booksByService', async () => {
    const spy = spyOn(bookService, 'getByCollection').and.resolveTo({
      guid: 'id1',
    } as any);

    const result = await resolver.resolve({
      paramMap: new Map([['guid', 'id1']]),
    } as any, null);

    expect(spy).toHaveBeenCalledOnceWith('id1');
    expect(result).toEqual({
      guid: 'id1'
    } as any);
  });
});

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BookStatus } from '../models/book-status';
import { BookStatusResolver } from './book-status.resolver';

describe('BookStatusResolver', () => {
  let resolver: BookStatusResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BookStatusResolver);
  });

  it('should create an instance', () => {
    expect(new BookStatusResolver()).toBeTruthy();
  });

  it('should return ToRead', async () => {
    const statusSpy = jasmine.createSpy().and.returnValue('0');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: statusSpy,
      },
    } as any;

    const status = await resolver.resolve(route, null);

    expect(statusSpy).toHaveBeenCalledWith('status');
    expect(statusSpy).toHaveBeenCalledTimes(1);

    expect(status).toEqual(BookStatus.ToRead);
  });

  it('should return InProgress', async () => {
    const statusSpy = jasmine.createSpy().and.returnValue('1');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: statusSpy,
      },
    } as any;

    const status = await resolver.resolve(route, null);

    expect(statusSpy).toHaveBeenCalledWith('status');
    expect(statusSpy).toHaveBeenCalledTimes(1);

    expect(status).toEqual(BookStatus.InProgress);
  });

  it('should requests ToRead', async () => {
    const statusSpy = jasmine.createSpy().and.returnValue('2');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: statusSpy,
      },
    } as any;

    const status = await resolver.resolve(route, null);

    expect(statusSpy).toHaveBeenCalledWith('status');
    expect(statusSpy).toHaveBeenCalledTimes(1);

    expect(status).toEqual(BookStatus.Done);
  });
});

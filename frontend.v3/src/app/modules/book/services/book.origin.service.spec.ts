import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {BookOriginService} from './book.origin.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../user/services/user.service';
import {of} from 'rxjs';

describe('BookOriginService', () => {
  let service: BookOriginService;
  let httpClient: HttpClient;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: UserService, useValue: {
            user: {
              id: 1
            }
          }
        }
      ]
    });
    service = TestBed.inject(BookOriginService);
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do getAll', async () => {
    const allSpy = spyOn(httpClient, 'get').and.returnValue(of([
      {
        guid: 'guid1',
        name: 'name1'
      },
    ]));

    const result = await service.getAll();

    expect(result).toEqual([
      {
        guid: 'guid1',
        name: 'name1'
      } as any
    ]);

    expect(allSpy).toHaveBeenCalledOnceWith('/book/user/1');
  });

  it('should do delete', async () => {
    const deleteSpy = spyOn(httpClient, 'delete').and.returnValue(of(null));

    await service.delete('id1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('/book/delete/id1');
  });

  it('should do sync', async () => {
    const syncSpy = spyOn(httpClient, 'post').and.returnValue(of(null));

    await service.sync({
      delete: [],
      update: []
    });

    expect(syncSpy).toHaveBeenCalledOnceWith('/book/synchronize/', {
      delete: [],
      update: []
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../user/services/user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CollectionOriginService } from './collection.origin.service';
import { CollectionData } from '../models/collection-data';

describe('CollectionOriginService', () => {
  let service: CollectionOriginService;
  let httpClient: HttpClient;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            user: {
              login: 'hrodvitnir',
              id: 1,
            },
          },
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CollectionOriginService);
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do getAll', async () => {
    const allSpy = spyOn(httpClient, 'get').and.returnValue(
      of([
        {
          guid: 'guid1',
          name: 'name1',
        },
      ]),
    );

    const result = await service.getAll();

    expect(result).toEqual([
      {
        guid: 'guid1',
        name: 'name1',
      } as any,
    ]);

    expect(allSpy).toHaveBeenCalledOnceWith('/collection/user/1');
  });

  it('should do create', async () => {
    const createSpy = spyOn(httpClient, 'post').and.returnValue(of(null));

    await service.create({} as CollectionData);

    expect(createSpy).toHaveBeenCalledOnceWith('/collection/create/', {});
  });

  it('should do update', async () => {
    const createSpy = spyOn(httpClient, 'put').and.returnValue(of(null));

    await service.update({} as CollectionData);

    expect(createSpy).toHaveBeenCalledOnceWith('/collection/update/', {});
  });

  it('should do delete', async () => {
    const deleteSpy = spyOn(httpClient, 'delete').and.returnValue(of(null));

    await service.delete('id1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('/collection/delete/id1');
  });

  it('should do sync', async () => {
    const syncSpy = spyOn(httpClient, 'post').and.returnValue(of(null));

    await service.sync({
      delete: [],
      update: [],
    });

    expect(syncSpy).toHaveBeenCalledOnceWith('/collection/synchronize/', {
      delete: [],
      update: [],
    });
  });
});

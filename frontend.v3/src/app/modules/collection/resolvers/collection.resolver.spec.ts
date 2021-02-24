import { TestBed } from '@angular/core/testing';
import { CollectionService } from '../../collection/services/collection.service';
import { CollectionResolver } from './collection.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../user/services/user.service';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('CollectionResolver', () => {
  let resolver: CollectionResolver;
  let collectionService: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: UserService, useValue: {
            user: {
              login: 'hrodvitnir'
            }
          }
        },
        {
          provide: ActivatedRouteSnapshot, useValue: {
            paramMap: new Map([['guid', 'guid']])
          }
        }
      ]
    });
    resolver = TestBed.inject(CollectionResolver);
    collectionService = TestBed.inject(CollectionService);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests collection', async () => {
    const spy = spyOn(collectionService, 'getByGuid');
    const params = TestBed.inject(ActivatedRouteSnapshot);

    await resolver.resolve(params, null);

    expect(spy).toHaveBeenCalledOnceWith('guid');
  });
});

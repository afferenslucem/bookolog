import { TestBed } from '@angular/core/testing';

import { CollectionStorageService } from './collection.storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../user/services/user.service';

describe('CollectionStorageService', () => {
  let service: CollectionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            user: {
              login: 'hrodvitnir',
            },
          },
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CollectionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

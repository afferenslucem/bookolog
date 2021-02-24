import { TestBed } from '@angular/core/testing';

import { CollectionStorageService } from './collection.storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../user/services/user.service';
import { BookOriginService } from '../../book/services/book.origin.service';
import { HttpClient } from '@angular/common/http';

describe('CollectionStorageService', () => {
  let service: CollectionStorageService;
  let httpClient: HttpClient;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService, useValue: {
            user: {
              login: 'hrodvitnir'
            }
          }
        }
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(CollectionStorageService);
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

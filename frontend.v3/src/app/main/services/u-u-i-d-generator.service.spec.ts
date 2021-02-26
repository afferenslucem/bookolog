import { TestBed } from '@angular/core/testing';

import { UUIDGeneratorService } from './u-u-i-d-generator.service';
import { UserService } from '../../modules/user/services/user.service';

describe('UUIDGeneratorService', () => {
  let service: UUIDGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: { user: { login: 'hrodvitnir' } } }
      ]
    });
    service = TestBed.inject(UUIDGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return guid', () => {
    const uuid = service.generate();

    expect(uuid).toBeTruthy();
  });
});

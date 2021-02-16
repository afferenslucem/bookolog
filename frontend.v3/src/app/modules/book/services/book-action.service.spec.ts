import { TestBed } from '@angular/core/testing';

import { BookActionService } from './book-action.service';
import { TestCore } from '../../../main/test/test-core.spec';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';
import { UserService } from '../../user/services/user.service';

describe('BookActionService', () => {
  let service: BookActionService;

  beforeEach(() => {
    TestCore.configureTestingModule({
      providers: [
        UUIDGeneratorService,
        {
          provide: UserService, useValue: { user: { login: 'hrodvitnir' }, },
        }
      ]
    });
    service = TestBed.inject(BookActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

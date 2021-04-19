import { TestBed } from '@angular/core/testing';
import { LogoutGuard } from './logout.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogoutGuard', () => {
  let guard: LogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(LogoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

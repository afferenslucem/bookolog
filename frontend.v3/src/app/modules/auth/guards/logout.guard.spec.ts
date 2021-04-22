import { TestBed } from '@angular/core/testing';
import { LogoutGuard } from './logout.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogoutGuard', () => {
  let guard: LogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(LogoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

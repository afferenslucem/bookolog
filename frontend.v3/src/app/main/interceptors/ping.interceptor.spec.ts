import { TestBed } from '@angular/core/testing';

import { PingInterceptor } from './ping.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PingInterceptor],
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const interceptor: PingInterceptor = TestBed.inject(PingInterceptor);

    expect(interceptor).toBeTruthy();
  });
});

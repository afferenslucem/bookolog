import { TestBed } from '@angular/core/testing';

import { PingService } from './ping.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('PingService', () => {
  let service: PingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Access check', () => {
    it('emit online', async done => {
      const pingSpy = spyOn(service.httpClient, 'get').and.returnValue(of());

      service.mode$.subscribe(result => {
        expect(result).toEqual('online');

        done();
      });

      const result = await service.ping();

      expect(pingSpy).toHaveBeenCalledOnceWith('http://localhost:35000/ping', jasmine.anything());
    });

    it('emit offline', async () => {
      const pingSpy = spyOn(service.httpClient, 'get').and.returnValue(throwError('offline'));

      try {
        const result = await service.ping();
      } catch (e) {
        expect(service.mode$.getValue()).toEqual('offline');
        expect(pingSpy).toHaveBeenCalledOnceWith('http://localhost:35000/ping', jasmine.anything());
      }
    });
  });
});

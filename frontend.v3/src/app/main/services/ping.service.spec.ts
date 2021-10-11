import { TestBed } from '@angular/core/testing';

import { PingService } from './ping.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, of, throwError } from 'rxjs';

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
    it('should send request', async () => {
      const pingSpy = spyOn(service.httpClient, 'get').and.returnValue(of());

      const result = await service.sendPing();

      expect(pingSpy).toHaveBeenCalledOnceWith('http://localhost:35000/ping', jasmine.anything());
    });

    it('emit offline', async () => {
      const pingSpy = spyOn(service.httpClient, 'get').and.returnValue(throwError('offline'));

      try {
        const result = await service.sendPing();
      } catch (e) {
        expect(service.mode).toEqual('offline');
        expect(pingSpy).toHaveBeenCalledOnceWith('http://localhost:35000/ping', jasmine.anything());
      }
    });

    describe('IsPingValid', () => {
      it('should set isPingValid true for valid request', async () => {
        const pingSpy = spyOn(service, 'setPingValidation');
        spyOn(service.httpClient, 'get').and.returnValue(of());

        await service.sendPing();

        expect(pingSpy).toHaveBeenCalledWith();
      });

      it('should set isPingValid true for failed request', async () => {
        const pingSpy = spyOn(service, 'setPingValidation');
        spyOn(service.httpClient, 'get').and.returnValue(throwError('offline'));

        try {
          await service.sendPing();
        } catch (e) {
          expect(pingSpy).toHaveBeenCalledWith();
        }
      });
    });
  });

  describe('State solve', () => {
    it('should return online for between 0 and 2000', () => {
      const result = service.solveState(1999);

      const expected = 'online';

      expect(result).toEqual(expected);
    });

    it('should return slowConnection for between 2001 and 4000', () => {
      const result = service.solveState(3999);

      const expected = 'slowConnection';

      expect(result).toEqual(expected);
    });
  });

  describe('onRequestFinished', () => {
    it('should emit online for 500', async done => {
      service.mode$.subscribe(result => {
        expect(result).toEqual('online');

        done();
      });

      service.onRequestFinished(500, 0);
    });

    it('should emit slowConnection for 2010', done => {
      service.mode$.subscribe(result => {
        expect(result).toEqual('slowConnection');

        done();
      });

      service.onRequestFinished(2010, 0);
    });
  });

  describe('Timer', () => {
    it('should fire event', done => {
      const [timer, promise] = service.getTimeoutTimer(500);

      promise.then(() => {
        expect(service.mode).toEqual('offline');
        expect(timer.alive).toBeFalse();
        done();
      });
    });
  });
});

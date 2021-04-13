import { TestBed } from '@angular/core/testing';

import { PreloaderService } from './preloader.service';

describe('PreloaderService', () => {
  let service: PreloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increment index', () => {
    service.show();

    // @ts-ignore
    expect(service._shouldShow).toEqual(1);
  });

  it('should decrement index', () => {
    service.hide();

    // @ts-ignore
    expect(service._shouldShow).toEqual(-1);
  });
});

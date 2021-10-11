import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionMarkerComponent } from './connection-marker.component';
import { PingService } from '../../services/ping.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConnectionMarkerComponent', () => {
  let component: ConnectionMarkerComponent;
  let fixture: ComponentFixture<ConnectionMarkerComponent>;
  let pinger: PingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionMarkerComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pinger = TestBed.inject(PingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('color binding', () => {
    it('for online should return green', () => {
      spyOnProperty(pinger, 'mode').and.returnValue('online');

      const expected = 'green';

      expect(component.color).toEqual(expected);
    });

    it('for slowConnection should return orange', () => {
      spyOnProperty(pinger, 'mode').and.returnValue('slowConnection');

      const expected = 'orange';

      expect(component.color).toEqual(expected);
    });

    it('for offline should return red', () => {
      spyOnProperty(pinger, 'mode').and.returnValue('offline');

      const expected = 'red';

      expect(component.color).toEqual(expected);
    });
  });
});

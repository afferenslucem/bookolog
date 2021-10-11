import { Component, HostBinding, OnInit } from '@angular/core';
import { PingService } from '../../services/ping.service';

@Component({
  selector: 'app-connection-marker',
  templateUrl: './connection-marker.component.html',
  styleUrls: ['./connection-marker.component.scss'],
})
export class ConnectionMarkerComponent {
  @HostBinding('attr.marker-color')
  public get color(): string {
    switch (this.ping.mode) {
      case 'online':
        return 'green';
      case 'offline':
        return 'red';
      case 'slowConnection':
        return 'orange';
    }
  }

  constructor(public ping: PingService) {}
}

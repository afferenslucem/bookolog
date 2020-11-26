import { Component, OnInit } from '@angular/core';
import { SyncService } from '../../services/sync.service';

@Component({
  selector: 'app-sync-info',
  templateUrl: './sync-info.component.html',
  styleUrls: ['./sync-info.component.scss']
})
export class SyncInfoComponent implements OnInit {

  constructor(private syncService: SyncService) { }

  public get lastSyncTime(): Date {
    return this.syncService.lastSyncDate;
  }

  ngOnInit(): void {
  }

  public async sync(): Promise {
    await this.syncService.syncAll();
  }
}

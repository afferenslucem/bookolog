import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getLogger } from '../../app.logging';
import { SyncService } from '../../services/sync.service';

@Component({
  selector: 'app-sync-info',
  templateUrl: './sync-info.component.html',
  styleUrls: ['./sync-info.component.scss']
})
export class SyncInfoComponent implements OnInit {
  private logger = getLogger('SyncInfoComponent');

  constructor(private syncService: SyncService, private router: Router, private activatedRoute: ActivatedRoute) { }

  public get lastSyncTime(): Date {
    return this.syncService.lastSyncDate;
  }

  ngOnInit(): void {
  }

  public async sync(): Promise<void> {
    try {
      await this.syncService.syncAll();
      await this.reload();
    } catch (e) {
      this.logger.debug('Sync error', e);
    }
  }

  public async reload(): Promise<void> {
    this.logger.debug('reload');
    await this.router.navigate(['.'], {relativeTo: this.activatedRoute});
  }
}

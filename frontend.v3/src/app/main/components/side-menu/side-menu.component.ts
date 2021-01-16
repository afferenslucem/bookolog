import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookStatus } from 'src/app/modules/book/models/book-status';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Output()
  public navigated = new EventEmitter<void>();

  public BookStatus: typeof BookStatus = BookStatus;

  public get version(): string {
    return environment.version;
  }

  public constructor(
    private router: Router,
    private auth: AuthService,
    private cache: CacheService,
    private notification: NotificationService
  ) {}

  public ngOnInit(): void {}

  public async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigate(['/']);
  }

  public async clearCache(): Promise<void> {
    try {
      await this.cache.clearAllCache();
      this.notification.createInfoNotification('Кэш очищен');
    } catch (e) {
      this.notification.createErrorNotification('Не удалось очистить кэш');
    }
  }
}

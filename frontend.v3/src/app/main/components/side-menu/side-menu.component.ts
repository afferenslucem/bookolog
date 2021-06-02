import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookStatus } from 'src/app/modules/book/models/book-status';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { mapTo, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  @Output()
  public navigated = new EventEmitter<void>();

  public newVersionAvailable: Observable<boolean>;

  public BookStatus: typeof BookStatus = BookStatus;

  public constructor(
    private router: Router,
    private auth: AuthService,
    private notification: NotificationService,
    private swUpdate: SwUpdate,
  ) {}

  public get version(): string {
    return environment.version;
  }

  public ngOnInit(): void {
    this.newVersionAvailable = this.swUpdate.available.pipe(mapTo(true), startWith(false));
  }

  public async logout(): Promise<void> {
    await this.router.navigate(['/logout']);
  }
}

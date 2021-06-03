import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';
import { DestroyService } from '../../../common/destroy.service';
import { BehaviorSubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Timer } from 'essents';

const TRANSPARENT_DELAY = 25;

@Component({
  selector: 'ui-side-menu-host',
  templateUrl: './side-menu-host.component.html',
  styleUrls: ['./side-menu-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventBusService, DestroyService],
})
export class SideMenuHostComponent {
  @Input()
  public hasBackdrop = false;

  public isDark$ = new BehaviorSubject(false);
  public isMenuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(private eventBus: EventBusService, private destroy$: DestroyService) {
    eventBus.open$
      .pipe(
        takeUntil(destroy$),
        tap(() => this.addDark()),
      )
      .subscribe(() => this.isMenuOpened$.next(true));

    eventBus.closeAll$
      .pipe(
        takeUntil(destroy$),
        tap(() => this.removeDark()),
      )
      .subscribe(() => this.isMenuOpened$.next(false));
  }

  public addDark(): void {
    new Timer(() => this.isDark$.next(this.hasBackdrop), TRANSPARENT_DELAY).start();
  }

  public removeDark(): void {
    new Timer(() => this.isDark$.next(false), TRANSPARENT_DELAY).start();
  }

  public closeAll(): void {
    this.eventBus.closeAll();
  }
}

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';
import { DestroyService } from '../../../common/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SideMenuComponent implements OnInit {
  @Input()
  public mode: 'top' | 'top' | 'left' | 'right' = 'left';

  constructor(private elRef: ElementRef<HTMLElement>, private eventBus: EventBusService, private destroy$: DestroyService) {
    this.eventBus.closeAll$.pipe(takeUntil(destroy$)).subscribe(() => this.close());
  }

  public open(): void {
    this.eventBus.open();
    this.elRef.nativeElement.classList.add('opened');
  }

  public close(): void {
    this.elRef.nativeElement.classList.remove('opened');
  }

  ngOnInit(): void {
    this.elRef.nativeElement.classList.add(this.mode);
  }
}

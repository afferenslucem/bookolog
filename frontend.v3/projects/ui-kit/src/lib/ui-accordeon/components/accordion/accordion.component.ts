import { Component, ContentChildren, QueryList } from '@angular/core';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { OpenDelegatorService } from '../../services/open-delegator.service';
import { DestroyService } from '../../../common/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [OpenDelegatorService, DestroyService],
})
export class AccordionComponent {
  @ContentChildren(ExpansionPanelComponent)
  public panels: QueryList<ExpansionPanelComponent>;

  constructor(private openDelegator: OpenDelegatorService, private destroy$: DestroyService) {
    this.openDelegator.open$.pipe(takeUntil(this.destroy$)).subscribe(panel => this.onOpen(panel));
  }

  public onOpen(panel: ExpansionPanelComponent): void {
    this.panels
      .filter(item => item.isOpened)
      .filter(item => item !== panel)
      .forEach(item => item.close());
  }
}

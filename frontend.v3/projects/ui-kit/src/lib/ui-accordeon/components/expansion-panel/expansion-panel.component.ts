import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { OpenDelegatorService } from '../../services/open-delegator.service';

@Component({
  selector: 'ui-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {
  @Output()
  public opened = new EventEmitter<void>();

  constructor(private openDelegator: OpenDelegatorService, private elRef: ElementRef<HTMLElement>) {}

  @Input()
  public set expanded(v: boolean) {
    if (v) {
      this.open();
    } else {
      this.close();
    }
  }

  private _isOpened = false;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  public get targetHeight(): number {
    const el = this.elRef.nativeElement.querySelector('ui-expansion-panel-body');

    if (el) {
      return el.scrollHeight + 32;
    } else {
      return undefined;
    }
  }

  public open(): void {
    this.openDelegator.emitOpen(this);
    this._isOpened = true;
    this.opened.emit();
  }

  public close(): void {
    this._isOpened = false;
  }

  public toggle(): void {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }
}

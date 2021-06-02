import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DestroyService } from '../../../common/destroy.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalRef } from '../../models/modal-ref';
import { ModalConfig } from '../../models/modal-config';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  public viewInited: Observable<void>;
  @ViewChild('placeholder', { read: ViewContainerRef }) container: ViewContainerRef;
  private _viewInited = new Subject<void>();

  constructor(private destroy$: DestroyService, private modalRef: ModalRef, public config: ModalConfig) {
    this.viewInited = this._viewInited.pipe(takeUntil(destroy$));
  }

  public ngAfterViewInit(): void {
    this._viewInited.next();
  }

  public onBackdropClick(): void {
    this.modalRef.close('cancel');
  }
}

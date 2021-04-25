import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/main/resolvers/action.resolver';
import { ILogger } from 'waterlog';
import { getConsoleLogger } from '../../../../main/app.logging';
import { DateUtils } from '../../../../main/utils/date-utils';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { Collection } from '../../models/collection';
import { CollectionData } from '../../models/collection-data';
import { CollectionService } from '../../services/collection.service';
import { CollectionDataForm } from '../../utils/collection-data-form';

@Component({
  selector: 'app-collection-edit-view',
  templateUrl: './collection-edit-view.component.html',
  styleUrls: ['./collection-edit-view.component.scss'],
})
export class CollectionEditViewComponent implements OnInit {
  public form: CollectionDataForm = null;

  public get collection(): Collection {
    return this.form.snapshot;
  }

  public action: Action;
  private logger: ILogger = getConsoleLogger('CollectionEditViewComponent');

  constructor(
    private titleService: TitleService,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.form = new CollectionDataForm(data.collection);

      this.readAction(data.action);

      this.form.build();
    });
  }

  public ngOnInit(): void {}

  public async submit(): Promise<void> {
    const data = Object.assign(this.collection, this.form.value) as Collection;

    await this.saveOrUpdate(data);
  }

  public async saveOrUpdate(data: Collection): Promise<void> {
    try {
      data.modifyDate = DateUtils.nowUTC;

      if (!data.createDate) {
        data.createDate = DateUtils.nowUTC;
      }

      await this.collectionService.saveOrUpdate(data);

      if (this.action === Action.Create) {
        await this.redirect();
      } else {
        await this.redirect(data.guid);
      }
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить серию', {
        autoclose: false,
      });
    }
  }

  public async redirect(guid?: string): Promise<void> {
    if (!guid) {
      await this.router.navigate(['/series']);
    } else {
      await this.router.navigate(['/series', guid]);
    }
  }

  public readAction(action: Action): void {
    if (action === Action.Create) {
      this.titleService.setCollectionCreate();
    } else if (action === Action.Edit) {
      this.titleService.setCollectionEdit();
    }

    this.action = action;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/main/resolvers/action.resolver';
import { ILogger } from 'waterlog';
import { getConsoleLogger } from '../../../../main/app.logging';
import { DateUtils } from '../../../../main/utils/date-utils';
import { NotificationService } from '../../../notification/services/notification.service';
import { Collection } from '../../models/collection';
import { CollectionService } from '../../services/collection.service';
import { CollectionDataForm } from '../../utils/collection-data-form';
import { BrokenConnectionError } from '../../../../main/models/errors/broken-connection-error';
import { EntityValidationError } from '../../../../main/models/errors/entity-validation-error';

@Component({
  selector: 'app-collection-edit-view',
  templateUrl: './collection-edit-view.component.html',
  styleUrls: ['./collection-edit-view.component.scss'],
})
export class CollectionEditViewComponent implements OnInit {
  public form: CollectionDataForm = null;
  public action: Action;
  private logger: ILogger = getConsoleLogger('CollectionEditViewComponent');

  constructor(
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

  public get collection(): Collection {
    return this.form.snapshot;
  }

  public ngOnInit(): void {}

  public async submit(): Promise<void> {
    try {
      const data = Object.assign(this.collection, this.form.value);
      await this.saveOrUpdate(data);
    } catch (e) {
      if (e instanceof BrokenConnectionError) {
        this.notificationService.createWarningNotification('Коллекция сохранена локально');
      } else if (e instanceof EntityValidationError) {
        this.notificationService.createWarningNotification('Некорректная модель коллекции');
      }
    }
  }

  public async saveOrUpdate(data: Collection): Promise<void> {
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
  }

  public async redirect(guid?: string): Promise<void> {
    if (!guid) {
      await this.router.navigate(['/series']);
    } else {
      await this.router.navigate(['/series', guid]);
    }
  }

  public readAction(action: Action): void {
    this.action = action;
  }
}

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
import { Location } from '@angular/common';

@Component({
  selector: 'app-collection-edit-view',
  templateUrl: './collection-edit-view.component.html',
  styleUrls: ['./collection-edit-view.component.scss'],
})
export class CollectionEditViewComponent implements OnInit {
  public form: FormGroup = null;
  public collection: Collection;
  public action: Action;
  private logger: ILogger = getConsoleLogger('CollectionEditViewComponent');
  private defaultData: CollectionData = {
    name: '',
    description: '',
    guid: '',
    createDate: '',
    modifyDate: '',
  };

  constructor(
    private titleService: TitleService,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    this.collection = new Collection({
      name: '',
      description: '',
      guid: '',
      createDate: '',
      modifyDate: '',
    });

    this.activatedRoute.data.subscribe(data => {
      this.collection = Object.assign({}, data.collection || new Collection(this.defaultData));

      this.formFromCollection(this.collection);

      this.readAction(data.action);
    });
  }

  public formFromCollection(collection: Collection): void {
    this.form = new FormBuilder().group({
      name: new FormControl(collection.name, Validators.required),
      description: new FormControl(collection.description),
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
        this.location.back();
      }
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить серию', {
        autoclose: false,
      });
    }
  }

  public async redirect(): Promise<void> {
    await this.router.navigate(['/series']);
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

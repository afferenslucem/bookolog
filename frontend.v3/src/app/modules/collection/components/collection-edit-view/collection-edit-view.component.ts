import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogger } from 'waterlog';
import { getLogger } from '../../../../main/app.logging';
import { DateUtils } from '../../../../main/utils/date-utils';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { Collection } from '../../models/collection';
import { CollectionData } from '../../models/collection-data';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-collection-edit-view',
  templateUrl: './collection-edit-view.component.html',
  styleUrls: ['./collection-edit-view.component.scss'],
})
export class CollectionEditViewComponent implements OnInit {
  public form: FormGroup = null;
  public collection: Collection;
  private logger: ILogger = getLogger('CollectionEditViewComponent');

  private defaultData: CollectionData = {
    name: '',
    description: '',
    guid: '',
    createDate: '',
    modifyDate: '',
  };

  constructor(private titleService: TitleService,
              private collectionService: CollectionService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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
    });
  }

  public formFromCollection(collection: Collection): void {
    this.form = new FormBuilder().group({
      name: new FormControl(collection.name, Validators.required),
      description: new FormControl(collection.description),
    });
  }

  public ngOnInit(): void {
    this.titleService.setCollectionCreate();
  }

  public async submit(): Promise<void> {
    try {
      const data = Object.assign(this.collection, this.form.value) as Collection;

      data.modifyDate = DateUtils.nowUTC;

      if (!data.createDate) {
        data.createDate = DateUtils.nowUTC;
      }

      await this.collectionService.saveOrUpdate(data);

      await this.redirect();
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить серию', {
        autoclose: false,
      });
    }
  }

  private async redirect(): Promise<void> {
    await this.router.navigate(['/series']);
  }
}

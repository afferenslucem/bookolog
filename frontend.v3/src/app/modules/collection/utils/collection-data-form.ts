import { AbstractForm } from '../../../main/utils/abstract-form';
import { Collection } from '../models/collection';
import { CollectionData } from '../models/collection-data';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

const defaultValue: CollectionData = {
  name: '',
  description: '',
  guid: '',
  createDate: '',
  modifyDate: '',
};

export class CollectionDataForm extends AbstractForm<Collection> {
  public snapshot: Collection;

  constructor(collection?: Collection) {
    super(null);

    this.snapshot = collection || new Collection(defaultValue);
  }

  public get name(): string {
    return this.getNameControl().value;
  }

  public set name(v: string) {
    this.getNameControl().setValue(v);
  }

  public get nameInvalid(): boolean {
    return this.getNameControl().invalid;
  }

  public get nameErrorMessage(): string {
    if (this.getNameControl().hasError('required')) {
      return 'Это обязательное поле';
    } else {
      return null;
    }
  }

  public get description(): string {
    return this.getDescriptionControl().value;
  }

  public set description(v: string) {
    this.getDescriptionControl().setValue(v);
  }

  public get descriptionInvalid(): boolean {
    return this.getDescriptionControl().invalid;
  }

  public get descriptionErrorMessage(): string {
    return null;
  }

  public build(): void {
    this.formFromCollection(this.snapshot);
  }

  private getNameControl(): AbstractControl {
    return this.form.get('name');
  }

  private getDescriptionControl(): AbstractControl {
    return this.form.get('description');
  }

  private formFromCollection(collection: Collection): void {
    this.form = new FormBuilder().group({
      name: new FormControl(collection.name, Validators.required),
      description: new FormControl(collection.description),
    });
  }
}

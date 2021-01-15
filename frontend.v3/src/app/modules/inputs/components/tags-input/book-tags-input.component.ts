import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import _ from 'declarray';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { StringComparer } from '../../../../main/utils/string.comparer';
import { ValueAccessorBase } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-book-tags-input',
  templateUrl: './book-tags-input.component.html',
  styleUrls: ['./book-tags-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BookTagsInputComponent),
    multi: true,
  }],
})
export class BookTagsInputComponent extends ValueAccessorBase<string[]> implements OnInit {
  @Input()
  public list: string[] = [];

  @Input()
  public header: string;

  public tags: string[] = [];

  public form = new FormBuilder().group({
    input: new FormControl(null, [Validators.min(2), Validators.max(128)]),
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.pushTag(event.option.value);
  }

  public append(): void {
    const value = this.tag;

    this.pushTag(value);
  }

  public pushTag(value: string): void {
    if (!!value && !_(this.tags).contains(value, new StringComparer())) {
      this.tags.push(value);

      this.emitChangeValue(this.tags);
    }

    this.tag = '';
  }

  public removeTag(tag: string): void {
    this.tags = _(this.tags).where(item => !new StringComparer().equal(item, tag)).toArray();

    this.emitChangeValue(this.tags);
  }

  public writeValue(value: string[]): void {
    this.tags = _(value).distinct(new StringComparer()).toArray();
  }

  public get tag(): string {
    return this.form.get('input').value;
  }

  public set tag(v: string) {
    this.form.get('input').setValue(v);
  }

  public get availableTags(): string[] {
    const tags = _(this.list).except(this.tags, new StringComparer()).toArray();

    if (this.tag) {
      return new FuzzySearch().search(tags, this.tag);
    } else {
      return tags;
    }
  }
}

import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import _ from 'declarray';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';
import { StringComparator } from '../../../../main/utils/string-comparator';
import { ValueAccessorBase } from '../value-accessor/value-accessor';
import { DestroyService } from 'bookolog-ui-kit';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { from, fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-book-tags-input',
  templateUrl: './book-tags-input.component.html',
  styleUrls: ['./book-tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BookTagsInputComponent),
      multi: true,
    },
    DestroyService,
  ],
})
export class BookTagsInputComponent extends ValueAccessorBase<string[]> implements OnInit {
  private static counter = 0;

  @Input()
  public list: string[] = [];

  @Input()
  public header: string;

  @Input()
  public placeholder = '';

  public tags: string[] = [];

  public form = new FormBuilder().group({
    input: new FormControl(null, [Validators.min(2), Validators.max(128)]),
  });

  public id: number;

  private _filteredTags: Observable<string[]>;

  constructor(private destroy$: DestroyService, private elRef: ElementRef<HTMLElement>) {
    super();
    this.id = ++BookTagsInputComponent.counter;
  }

  public get tagId(): string {
    return `tagAutocomplete-${this.id}`;
  }

  public get tag(): string {
    return this.form.get('input').value;
  }

  public set tag(v: string) {
    this.form.get('input').setValue(v, {
      emitEvent: false,
    });
  }

  public get availableTags(): Observable<string[]> {
    return this._filteredTags;
  }

  ngOnInit(): void {
    this.subscribeToAutocomplete();

    this._filteredTags = this.form.get('input').valueChanges.pipe(
      filter(() => !!this.list?.length),
      startWith(this.tag || ''),
      switchMap(item => {
        const tags = _(this.list).except(this.tags, new StringComparator()).promisify().toArray();
        return this.scanTags(tags, item);
      }),
      map(item => _(item)),
      map(item => item.where(variant => variant !== this.tag)),
      switchMap(item => from(item.promisify().toArray())),
    );
  }

  private scanTags(tagsPromise: Promise<string[]>, pattern: string): Observable<string[]> {
    return from(tagsPromise).pipe(switchMap(result => from(new FuzzySearch().searchAsync(result, pattern))));
  }

  public append(): void {
    const value = this.tag;

    this.pushTag(value);
  }

  public pushTag(value: string): void {
    if (value && !_(this.tags).contains(value, new StringComparator())) {
      this.tags.push(value);

      this.emitChangeValue(this.tags);
    }

    this.tag = '';
  }

  public removeTag(tag: string): void {
    this.tags = _(this.tags)
      .where(item => !new StringComparator().equals(item, tag))
      .toArray();

    this.emitChangeValue(this.tags);
  }

  public writeValue(value: string[]): void {
    this.tags = _(value).distinct(new StringComparator()).toArray();
  }

  private subscribeToAutocomplete(): void {
    fromEvent<InputEvent>(this.elRef.nativeElement.querySelector('.tag'), 'input')
      .pipe(
        takeUntil(this.destroy$),
        filter((event: InputEvent) => event.inputType == null),
        filter((event: InputEvent) => event.data == null),
        map((event: InputEvent) => event.target as any),
      )
      .subscribe(target => this.pushTag(target.value));
  }

  public trackByValue(index: number, item: any): string {
    return item;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTagsInputComponent } from './book-tags-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('TagsInputComponent', () => {
  let component: BookTagsInputComponent;
  let fixture: ComponentFixture<BookTagsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookTagsInputComponent],
      imports: [
        MatAutocompleteModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tags writing', () => {
    it('should write value', () => {
      component.writeValue(['one', 'One', 'two', 'three']);

      expect(component.tags).toEqual(['one', 'two', 'three']);
    });
  });

  describe('Push tags', () => {
    it('should pass empty tag', () => {
      component.pushTag('');

      expect(component.tags).toEqual([]);
    });

    it('should push new tag', () => {
      component.pushTag('one');

      expect(component.tags).toEqual(['one']);
    });

    it('should pass redundant', () => {
      component.pushTag('one');
      component.pushTag('two');
      component.pushTag('Two');

      expect(component.tags).toEqual(['one', 'two']);
    });
  });

  describe('Remove tags', () => {
    it('should pass empty tag', () => {
      component.writeValue(['One', 'two']);

      component.removeTag('one');

      expect(component.tags).toEqual(['two']);
    });
  });

  describe('Tag alias', () => {
    it('should set form value', () => {
      component.tag = 'ping';

      expect(component.form.get('input').value).toEqual('ping');
    });

    it('should get form value', () => {
      component.form.get('input').setValue('pong');

      expect(component.tag).toEqual('pong');
    });
  });

  describe('Available tags', () => {
    it('should return all', () => {
      component.list = ['one', 'two', 'three'];
      component.tag = '';

      expect(component.availableTags).toEqual(['one', 'two', 'three']);
    });

    it('should return filtered', () => {
      component.list = ['one', 'two', 'three'];
      component.tag = 'o';

      expect(component.availableTags).toEqual(['one', 'two']);
    });

    it('should return except selected', () => {
      component.list = ['one', 'two', 'three'];

      component.pushTag('One');

      expect(component.availableTags).toEqual(['two', 'three']);
    });

    it('should return filtered except selected', () => {
      component.list = ['one', 'two', 'three'];

      component.pushTag('One');
      component.tag = 'o';

      expect(component.availableTags).toEqual(['two']);
    });
  });
});

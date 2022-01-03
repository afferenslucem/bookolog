import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTagsInputComponent } from './book-tags-input.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { skip } from 'rxjs/operators';

describe('BookTagsInputComponent', () => {
  let component: BookTagsInputComponent;
  let fixture: ComponentFixture<BookTagsInputComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookTagsInputComponent],
    }).compileComponents();
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
    it('should return all', done => {
      component.list = ['one', 'two', 'three'];

      component.availableTags.subscribe(result => {
        expect(result).toEqual(['one', 'two', 'three']);
        done();
      });

      component.form.get('input').setValue('');
    });

    it('should return filtered', done => {
      component.list = ['one', 'two', 'three'];

      component.availableTags.subscribe(result => {
        expect(result).toEqual(['one', 'two']);
        done();
      });

      component.form.get('input').setValue('o');
    });

    it('should return except selected', done => {
      component.list = ['one', 'two', 'three'];

      component.pushTag('One');

      component.availableTags.subscribe(result => {
        expect(result).toEqual(['two', 'three']);
        done();
      });

      component.form.get('input').setValue('');
    });

    it('should return filtered except selected', done => {
      component.list = ['one', 'two', 'three'];

      component.pushTag('One');

      component.availableTags.subscribe(result => {
        expect(result).toEqual(['two']);
        done();
      });

      component.form.get('input').setValue('o');
    });
  });
});

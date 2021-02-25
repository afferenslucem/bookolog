import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { TagValueComponent } from './tag-value.component';
import { first, mapTo } from 'rxjs/operators';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('TagValueComponent', () => {
  let component: TagValueComponent;
  let fixture: ComponentFixture<TagValueComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [TagValueComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(TagValueComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagValueComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('show cross', () => {
    it('should show for true', () => {
      component.showCross = true;

      fixture.detectChanges();

      expect(element.querySelector('.tag__close')).toBeTruthy();
    });

    it('should show for \'true\'', () => {
      component.showCross = 'true';

      fixture.detectChanges();

      expect(element.querySelector('.tag__close')).toBeTruthy();
    });

    it('should show by default', () => {
      expect(element.querySelector('.tag__close')).toBeTruthy();
    });

    it('should hide for false', () => {
      component.showCross = false;

      fixture.detectChanges();

      expect(element.querySelector('.tag__close')).toBeFalsy();
    });

    it('should hide for \'false\'', () => {
      component.showCross = 'false';

      fixture.detectChanges();

      expect(element.querySelector('.tag__close')).toBeFalsy();
    });
  });

  it('should show text', () => {
    component.name = 'Text example';

    fixture.detectChanges();

    expect(element.querySelector<HTMLElement>('.tag__value').innerText).toEqual('Text example');
  });

  it('should emit event', async () => {
    const spy = spyOn(component.crossClick, 'emit');

    element.querySelector<HTMLElement>('.tag__close').click();

    expect(spy).toHaveBeenCalled();
  });
});

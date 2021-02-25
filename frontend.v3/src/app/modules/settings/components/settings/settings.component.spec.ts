import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { ChangeDetectionStrategy } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let title: TitleService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [SettingsComponent],
    })
      .overrideComponent(SettingsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    title = TestBed.inject(TitleService);
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('confirmationValidation', () => {
    it ('should set error', () => {
      component.ngOnInit();

      expect(title.title).toEqual(TitleText.Settings);
    });
  });
});

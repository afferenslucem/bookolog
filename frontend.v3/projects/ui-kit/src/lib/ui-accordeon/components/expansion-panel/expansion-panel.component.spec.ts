import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { OpenDelegatorService } from '../../services/open-delegator.service';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;
  let delegator: OpenDelegatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    delegator = TestBed.inject(OpenDelegatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('expanded', () => {
    it('should execute open', () => {
      const openSpy = spyOn(component, 'open');

      component.expanded = true;

      expect(openSpy).toHaveBeenCalledWith();
    });

    it('should execute close', () => {
      const closeSpy = spyOn(component, 'close');

      component.expanded = false;

      expect(closeSpy).toHaveBeenCalledWith();
    });
  });

  describe('open', () => {
    it('should set isOpen true', () => {
      component.open();

      expect(component.isOpened).toBeTrue();
    });

    it('should trigger opened', done => {
      component.opened.subscribe(() => {
        expect().nothing();
        done();
      });

      component.open();
    });

    it('should trigger opened', done => {
      component.opened.subscribe(() => {
        expect().nothing();
        done();
      });

      component.open();
    });

    it('should trigger delegator opened', done => {
      const delegator = TestBed.inject(OpenDelegatorService);

      delegator.open$.subscribe(panel => {
        expect(panel).toEqual(component);
        done();
      });

      component.open();
    });
  });

  it('close should set isOpened true', () => {
    component.close();

    expect(component.isOpened).toBeFalse();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelBodyComponent } from './expansion-panel-body.component';

describe('ExpansionPanelBodyComponent', () => {
  let component: ExpansionPanelBodyComponent;
  let fixture: ComponentFixture<ExpansionPanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPanelBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

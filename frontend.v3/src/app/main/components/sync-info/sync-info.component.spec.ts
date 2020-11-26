import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncInfoComponent } from './sync-info.component';

describe('SyncInfoComponent', () => {
  let component: SyncInfoComponent;
  let fixture: ComponentFixture<SyncInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

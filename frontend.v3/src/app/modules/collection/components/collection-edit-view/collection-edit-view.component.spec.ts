import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEditViewComponent } from './collection-edit-view.component';

describe('CollectionEditViewComponent', () => {
  let component: CollectionEditViewComponent;
  let fixture: ComponentFixture<CollectionEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
